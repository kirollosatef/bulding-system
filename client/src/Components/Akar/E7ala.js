import React, { useState } from "react";
import style from "../AddForms/Forms.module.css";
import style2 from "./Akar.module.css";
import style3 from "./Referral.module.css";
import style4 from "../RentInfo/Rent.module.css";
import { tafqeet } from "./Tafqeet";

import { Link } from "react-router-dom";
export default function E7ala(props) {
  if (props.setSide) props.setSide(true);
  const [error, setError] = useState();
  const [periods, setPeriods] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  const add = async (e) => {
    e.preventDefault();
    console.log(props.timeToPay);
    if (
      !props.from ||
      !props.to ||
      !props.amount ||
      !props.price ||
      !props.purpose ||
      !props.contractType ||
      !props.period ||
      !props.timeToPay
    )
      setError("ادخل البيانات كاملة");
    else {
      setError("");
      props.setShow2(false);
      props.setShow(false);
    }
  };
  if (!props.show) return <></>;

  return (
    <div
      className={`${style3.Modal2} ${style4.RentContainerModal}`}
      style={{ marginTop: "0px", width: "100%" }}
    >
      <div className={style.Forms}>
        <form
          className={style3.btns}
          style={{
            width: "80%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <button
            onClick={() => {
              setError("");
              props.setShow(false);
            }}
            style={{ width: "8rem" }}
          >
            اغلاق
          </button>
          <h3 style={{ marginBottom: "40px" }}> اضافة احالة</h3>
          <div className={style2.Choice}>
            <div className={style2.Single2}>
              <label>المبلغ كتابيا </label>
              <input
                type="text"
                value={tafqeet(props.amount)}
                style={{ overflow: "scroll" }}
                disabled
              ></input>
            </div>

            <div className={style2.Single2}>
              <label>مبلغ الاحالة </label>
              <input
                type="number"
                defaultValue={props.amount}
                onChange={(e) => props.setAmount(e.target.value)}
                required
              ></input>
            </div>
            <div className={style2.Single2}>
              <label>اسم العقار </label>
              <input
                type="text"
                disabled
                value={props.buildname}
                required
              ></input>
            </div>
          </div>
          <div className={style2.Choice}>
            <div className={style2.Single2}>
              <label>الي</label>
              <input
                type="date"
                defaultValue={props.to}
                onChange={(e) => props.setTo(e.target.value)}
                required
              ></input>
            </div>
            <div className={style2.Single2}>
              <label>تاريخ الاحالة&nbsp; من</label>
              <input
                type="date"
                defaultValue={props.from}
                onChange={(e) => props.setFrom(e.target.value)}
                required
              ></input>
            </div>

            <div className={style2.Single2}>
              <label>مدة الاحالة </label>
              <input
                type="text"
                defaultValue={props.to}
                onChange={(e) => props.setPeriod(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className={style2.Choice}>
            <div className={style2.Single2}>
              <label>مبلغ الكشف الفني</label>
              <input
                type="number"
                defaultValue={props.price}
                onChange={(e) => props.setPrice(e.target.value)}
              ></input>
            </div>
            <div className={style2.Single2}>
              <label>نوع العقد</label>
              <select
                style={{ width: "86%" }}
                name="akd"
                id="akd"
                defaultValue={props.contractType}
                onChange={(e) => props.setContractType(e.target.value)}
              >
                <option value="" disabled selected>
                  اختار نوع العقد
                </option>
                <option value="صناعي">صناعي</option>
                <option value="تجاري">تجاري</option>
                <option value="مساطحة">مساطحة</option>
              </select>
            </div>
            <div className={style2.Single2}>
              <label>لغرض</label>
              <input
                type="text"
                defaultValue={props.purpose}
                onChange={(e) => props.setPurpose(e.target.value)}
              ></input>
            </div>
          </div>

          <div
            className={style2.Single2}
            style={{ width: "20%", marginLeft: "67%" }}
          >
            <label>مده تسديد الايجار بالشهور</label>
            <input
              type="number"
              defaultValue={props.timeToPay}
              onChange={(e) => props.setTimeToPay(e.target.value)}
            ></input>
          </div>
          <button
            type="submit"
            style={{ marginTop: "50px", width: "50%" }}
            onClick={(e) => add(e)}
          >
            اضافه
          </button>
          <div
            style={{
              marginBottom: "25px",
              margin: "auto",
              color: "#ff0000",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        </form>
      </div>
    </div>
  );
}
