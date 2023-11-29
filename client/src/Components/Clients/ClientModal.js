import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import style from "../Akar/Referral.module.css";
import style2 from "../Akar/Referral.module.css";
import { useNavigate } from "react-router-dom";
export default function ClientModal(props) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState();
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  let getData = async (page) => {
    if (page * 1 < 0) return;
    let token = localStorage.getItem("auth");
    let res;

    res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/client/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (res.status != 200) {
      return;
    }
    setPage(page);
    res = await res.json();
    setClients(res);
  };
  useEffect(() => {
    getData(1);
  }, []);

  const search = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth");
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/client/search?page=${page}`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      res = await res.json();
      setClients(res);
    }
  };

  if (!props.show3) return <></>;

  return (
    <div className={style.Modal}>
      <div className={style.RefContainer}>
        <div className={style.top}>اختيار مستأجر للاحاله</div>
        <form
          className={style2.btns}
          style={{ width: "80%" }}
          onSubmit={search}
        >
          <button type="button" onClick={() => props.setShow3(false)}>
            اغلاق
          </button>
          <input
            type="text"
            placeholder="اختار اسم المستأجر "
            style={{ width: "35%", padding: "5px" }}
            onChange={(e) => setName(e.target.value)}
          ></input>

          <button type="submit">بحث</button>
        </form>
        <div
          className={style2.girdTable}
          style={{ width: "90%", marginTop: "0" }}
        >
          <div className={style2.girdItem}>مساحة</div>
          <div className={style2.girdItem}>رقم القطعة</div>
          <div className={style2.girdItem}>رقم العقار</div>
          <div className={style2.girdItem}>تسلسل</div>
          <div className={style2.girdItem}>#</div>
        </div>
        {clients &&
          clients.map((client, index) => {
       //     console.log(client);
            return (
              <div
                key={index}
                className={style2.girdTable2}
                style={{ width: "90%" }}
              >
                <div className={style2.girdItem2}>
                  <button
                    onClick={() => {
                      //  console.log(props.type);
                      props.setClient(client);
                      props.setShow3(false);
                    }}
                  >
                    اختار
                  </button>
                </div>
                <div className={style2.girdItem2}>{client.phone}</div>
                <div className={style2.girdItem2}>{client.name}</div>
                <div className={style2.girdItem2}>{client._id}</div>
                <div className={style2.girdItem2}>{index + 1}</div>
              </div>
            );
          })}
        <div className={style2.btns}>
          <button
            onClick={() => getData(page + 1)}
            style={{ marginBottom: "25px" }}
          >
            التالي
          </button>
          <button
            onClick={() => getData(page - 1)}
            style={{ marginBottom: "25px" }}
          >
            الرجوع
          </button>
        </div>
      </div>
    </div>
  );
}
