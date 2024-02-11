import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import style from "./Referral.module.css";
import style2 from "../Akar/Referral.module.css";
import { useNavigate } from "react-router-dom";
import E7ala from "./E7ala";
export default function Referral(props) {
  if (props.setSide) props.setSide(true);
  const [page, setPage] = useState(1);
  const [number, setNumber] = useState();
  const [type, setType] = useState();
  const [builds, setBuilds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let getData = async () => {
      let token = localStorage.getItem("auth");
      let res;
      if (number && type) {
        res = await fetch(
          `${process.env.REACT_APP_API_ROOT}/building/search?page=${page}`,
          {
            method: "POST",
            body: JSON.stringify({
              number,
              type,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        res = await fetch(
          `${process.env.REACT_APP_API_ROOT}/building/?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
      }

      if (res.status != 200) {
        navigate("/signin");
        return;
      }
      res = await res.json();
      setBuilds(res);
    };

    getData();
  }, [page]);

  const search = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth");
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/building/search?page=${page}`,
      {
        method: "POST",
        body: JSON.stringify({
          number,
          type,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      res = await res.json();
      setBuilds(res);
    }
  };

  if (!props.show) return <></>;

  return (
    <div className={style.Modal}>
      <div className={style.RefContainer}>
        <div className={style.top}>اختيار عقار للاحاله</div>
        <form className={style2.btns} style={{ width: "80%" }}>
          <button onClick={() => props.setShow(false)}>اغلاق</button>
          <input
            type="text"
            placeholder="اختار رقم العقار"
            style={{ width: "35%", padding: "5px" }}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <select
            style={{ width: "35%", padding: "5px" }}
            name="akar"
            id="akar"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled selected>
              اختار نوع العقار
            </option>
            <option value="بارك">بارك</option>
            <option value="كشك">كشك</option>
            <option value="محل">محل</option>
            <option value="مساطحه">مساطحه</option>
          </select>

          <button
            type="submit"
            onClick={(e) => {
              search(e);
            }}
          >
            بحث
          </button>
        </form>
        <div
          className={style2.girdTable}
          style={{ width: "90%", marginTop: "0" }}
        >
          <div className={style2.girdItem}>مساحة</div>
          <div className={style2.girdItem}>رقم القطعة</div>
          <div className={style2.girdItem}>رقم العقار</div>
          <div className={style2.girdItem}>تسلسل</div>
          <div className={style2.girdItem}></div>
        </div>
        {builds.map((build, index) => {
          return (
            <div
              key={index}
              className={style2.girdTable2}
              style={{ width: "90%" }}
            >
              <div className={style2.girdItem2}>
                <button
                  onClick={() => {
                    console.log(props.type);
                    props.setBuilding(build);
                    if (props.type == "ايجار") {
                      props.setShow2(true);
                    } else {
                      props.setShow(false);
                    }
                  }}
                >
                  اختار
                </button>
              </div>
              <div className={style2.girdItem2}>{build.pieceNumber}</div>
              <div className={style2.girdItem2}>{build.number}</div>
              <div className={style2.girdItem2}>{build._id}</div>
              <div className={style2.girdItem2}>{index + 1}</div>
            </div>
          );
        })}
        <div className={style2.btns}>
          <button
            onClick={() => setPage((pre) => pre + 1)}
            style={{ marginBottom: "25px" }}
          >
            التالي
          </button>
          <button
            onClick={() => setPage((pre) => pre - 1)}
            style={{ marginBottom: "25px" }}
          >
            الرجوع
          </button>
        </div>
      </div>
    </div>
  );
}
