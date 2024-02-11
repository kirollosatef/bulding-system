import React, { useState } from "react";
import style from "../AddForms/Forms.module.css";
import { Link } from "react-router-dom";
import { Stack, Alert } from "@mui/material";
export default function Clients() {
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [notes, setNotes] = useState(null);
  const [err, setError] = useState("");
  const [alert,setAlert] = useState(false)
  const add = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth");
    let res = await fetch(`${process.env.REACT_APP_API_ROOT}/client/add`, {
      method: "POST",
      body: JSON.stringify({
        notes,
        phone,
        address,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (res.status == 200) {
      res = await res.json();
      setAlert(true)
      setTimeout(()=>{
        setAlert(false)
      },1500)
      setError("");
    } else {
      res = await res.json();
      setError(res);
    }
  };
  return (
    <div className={style.Fcont}>
      {alert && (
        <Alert
          variant="filled"
          severity="success"
          style={{ marginTop: "15px" }}
        >
          تم اضافه المستأجر بنجاح
        </Alert>
      )}

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
        <form style={{ width: "70%", margin: "auto" }} onSubmit={add}>
          <h3>بيانات المستأجر</h3>
          <label>الاسم الثلاثي</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <label>العنوان / السكن </label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <label> رقم الهاتف</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
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
          <p style={{ textAlign: "center", color: "red" }}>{err}</p>
        </form>
      </div>
    </div>
  );
}
