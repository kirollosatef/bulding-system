import React, { useEffect, useState } from "react";
import style from "../AddForms/Forms.module.css";
import style2 from "./Akar.module.css";
import style3 from "./Referral.module.css";

import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Alert } from "@mui/material";
export default function Add(props) {
  props.setSide(true)
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [number, setNumber] = useState();
  const [pieceNumber, setPieceNumber] = useState();
  const [location, setLocation] = useState();
  const [done, setDone] = useState();
  const [error, setError] = useState();
  const [alert,setAlert] = useState(null)
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth");
    let res = await fetch(`${process.env.REACT_APP_API_ROOT}/building/add`, {
      method: "POST",
      body: JSON.stringify({
        number,
        type,
        location,
        pieceNumber,
        name,
        area,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (res.status == 200) {
      res = await res.json();
      setAlert("تم الاضافة بنجاح");
      setTimeout(() => {
        window.location.reload()
      }, [2000]);
      setError("");
    } else {
      res = await res.json();
      setError(res);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("auth");
    if (token) {
      token = jwtDecode(token);
      if (!token) navigate("/signin");
    } else navigate("/signin");
  }, []);

  return (
    <div className={style.Fcont}>
      {alert && (
        <Alert
          variant="filled"
          severity="success"
          style={{ marginTop: "15px" }}
        >
          {alert}
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
          className={style.lnk2}
          style={{ marginRight: "30px" }}
        >
          إضافة مستأجر
        </Link>
        <Link to="/addAkar" className={style.lnk}>
          إضافة عقار
        </Link>
      </div>
      <hr
        style={{ color: "#798db5", width: "100%", marginBottom: "40px" }}
      ></hr>
      <div className={style.Forms}>
        <form
          className={style3.btns}
          style={{
            width: "80%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ marginBottom: "40px" }}> بيانات العقار</h3>
          <div className={style2.Choice}>
            <div className={style2.Single}>
              <label>الاسم </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className={style2.Single}>
              <label>الموقع </label>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
              ></input>
            </div>
          </div>
          <div className={style2.Choice}>
            <div className={style2.Single}>
              <label>المساحة </label>
              <input
                type="number"
                onChange={(e) => setArea(e.target.value)}
              ></input>
            </div>
            <div className={style2.Single}>
              <label>الرقم </label>
              <input
                type="number"
                onChange={(e) => setNumber(e.target.value)}
              ></input>
            </div>
          </div>
          <div className={style2.Choice}>
            <div className={style2.Single}>
              <label>رقم القطعة </label>
              <input
                type="number"
                onChange={(e) => setPieceNumber(e.target.value)}
              ></input>
            </div>
            <div className={style2.Single}>
              <label>نوع العقار </label>
              <select
                style={{ width: "86%" }}
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
            </div>
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
              color: "#00ff00",
              fontWeight: "bold",
            }}
          >
            {done}{" "}
          </div>
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
