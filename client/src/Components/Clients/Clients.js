import React, { useState } from "react";
import style from "../AddForms/Forms.module.css";
import { Link } from "react-router-dom";
export default function Clients() {
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [notes, setNotes] = useState(null);
  return (
    <div className={style.Fcont}>
      <div className={style.Ftop}>
        <Link
          to="/addRent"
          className={style.lnk2}
          style={{ marginRight: "30px" }}
        >
          إضافة احاله
        </Link>
        <Link
          to="/addclient"
          className={style.lnk}
          style={{ marginRight: "30px" }}
        >
          إضافة مستأجر
        </Link>
        <Link to="/addAkar" className={style.lnk2}>
          إضافة عقار
        </Link>
      </div>
      <hr
        style={{ color: "#798db5", width: "100%", marginBottom: "40px" }}
      ></hr>
      <div className={style.Forms}>
        <form style={{ width: "70%", margin: "auto" }}>
          <h3>بيانات المستأجر</h3>
          <label>الاسم الثلاثي</label>
          <input type="text" onChange={(e) => setName(e.target.value)}></input>
          <label>العنوان / السكن </label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <label> رقم الهاتف</label>
          <input type="text" onChange={(e) => setPhone(e.target.value)}></input>
          <label> ملاحظات </label>
          <input
            type="text"
            style={{ height: "50px" }}
            onChange={(e) => setNotes(e.target.value)}
          ></input>
          <button
            type="submit"
            style={{ marginTop: "20px", width: "50%" }}
            // onClick={(e) => add(e)}
          >
            اضافه
          </button>
        </form>
      </div>
    </div>
  );
}
