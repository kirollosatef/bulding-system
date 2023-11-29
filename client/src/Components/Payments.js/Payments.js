import React, { useEffect, useState } from "react";
import style from "../RentInfo/Rent.module.css";
import style3 from "./payment.module.css";
import { useNavigate } from "react-router-dom";
export default function Payments(props) {
  if (props.setSide) props.setSide(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [builds, setBuilds] = useState([]);
  const [searchPage, setSearch] = useState(1);
  const navigate = useNavigate();
  let token = localStorage.getItem("auth");
  let getData = async (page) => {
    setSearch(1);
    if(page == 0) return
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/payment/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status != 200) {
      navigate("/signin");
      return;
    }
    res = await res.json();
    if (res.length) {
      setBuilds(res);
      setPage(page);
    }
  };
  useEffect(() => {
    getData(1);
  }, []);
  const search = async (page) => {
    if(page == 0) return
    if(!number && !name){
      getData(1);
      return
    }
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/payment/search/?page=${page}`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          number
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.ok) {
      res = await res.json();
      console.log(res, page);
      setBuilds(res);
      if (res.length > 0) setSearch(page);
    }
  };

  return (
    <div className={style.RentContainer}>
      <div className={style.top}>الحسابات </div>
      <form
        className={style3.btns}
        onSubmit={(e) => {
          e.preventDefault();
          search(1);
        }}
      >
        <input
          type="text"
          placeholder="اسم المستأجر"
          style={{ padding: "8px" }}
          onChange={(e)=>setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="رقم العقد"
          style={{ padding: "8px" }}
          onChange={(e)=>setNumber(e.target.value)}
        ></input>
        {/* <button type="submit">ايداع</button>&nbsp;&nbsp; */}
        <button type="submit">بحث</button>
      </form>
      <div
        className={style3.girdTable}
        style={{ width: "100%", marginTop: "50px" }}
      >
        {/* <div className={style3.girdItem}>طباعه </div> */}
        <div className={style3.girdItem}>رقم العقد</div>
        <div className={style3.girdItem}>رقم العقار</div>
        <div className={style3.girdItem}>اسم العقار</div>
        <div className={style3.girdItem}>تاريخ التسديد </div>
        <div className={style3.girdItem}>المبلغ</div>
        <div className={style3.girdItem}>الاسم</div>
        <div className={style3.girdItem}>#</div>
      </div>
      {builds.map((client, index) => {
        return (
          <div
            key={index}
            className={style3.girdTable2}
            style={{ width: "100%" }}
          >
            {/* <div className={style3.girdItem2}>
              <button
                style={{
                  marginBottom: "2px",
                  backgroundColor: "#071a3e",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                طباعه
              </button>
            </div> */}
            <div className={style3.girdItem2}>{client.contractNumber}</div>
            <div className={style3.girdItem2}>{client.buildingName}</div>

            <div className={style3.girdItem2}>{client.buildingName}</div>
            <div className={style3.girdItem2}>
              {client.createdAt.slice(0, 10)}
            </div>
            <div className={style3.girdItem2}>{client.rent?.amount}</div>
            <div className={style3.girdItem2}>{client.clientName}</div>
            <div className={style3.girdItem2}>{index + 1}</div>
          </div>
        );
      })}
      <div className={style3.btns}>
        <button
          onClick={() => {
            if ((number && number != "") || (name && name != "")) {
              search(searchPage + 1);
              console.log('pppppppppppppp')
            } else {
              getData(page + 1);
            }
          }}
          style={{ marginBottom: "25px" }}
        >
          التالي
        </button>
        <button
          onClick={() => {
            if ((number && number != "") || (name && name != "")) {
              search(searchPage - 1);
            } else {
              getData(page - 1);
            }
          }}
          style={{ marginBottom: "25px" }}
        >
          الرجوع
        </button>
      </div>
    </div>
  );
}
