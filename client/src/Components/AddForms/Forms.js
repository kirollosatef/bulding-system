import React, { useState } from "react";
import style from "./Forms.module.css";
import { Link } from "react-router-dom";
import Referral from "../Akar/Referral";
import E7ala from "../Akar/E7ala";
import ClientModal from "../Clients/ClientModal";
export default function Forms(props) {
  if (props.setSide) props.setSide(true);
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [notes, setNotes] = useState();
  const [date, setDate] = useState();
  const [building, setBuilding] = useState(props.building);
  const [type, setType] = useState("ايجار");
  const [done, setDone] = useState();
  const [error, setError] = useState();

  const [show2, setShow2] = useState(props.building ? true : false);
  const [purpose, setPurpose] = useState();
  const [period, setPeriod] = useState();
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [contractType, setContractType] = useState();
  const [price, setPrice] = useState();
  const [rentPeriod, setRentPeriod] = useState();
  const [timeToPay, setTimeToPay] = useState(null);
  const [show3, setShow3] = useState();
  const [client, setClient] = useState();

  const submit = async (e) => {
    e.preventDefault();
    if (!type) return;
    console.log(from);
    if (type == "ايجار") {
      let token = localStorage.getItem("auth");

      let res = await fetch(`${process.env.REACT_APP_API_ROOT}/rent/add`, {
        method: "POST",
        body: JSON.stringify({
          clientId:client._id,
          buildId: building?._id,
          period,
          amount,
          from,
          to,
          price,
          type: contractType,
          purpose,
          timeToPay
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res.status == 200) {
        setDone("تم الإيجار بنجاح");
        setTimeout(() => {
          setDone("");
          window.location.replace("/addRent");
        }, [1000]);
        setError("");
      } else {
        res = await res.json();
    //    setError(res);
      }
    } else {
      let token = localStorage.getItem("auth");
      let res = await fetch(`${process.env.REACT_APP_API_ROOT}/rent/extend`, {
        method: "POST",
        body: JSON.stringify({
          to: date,
          clientName: name,
          buildingName: building?.name,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res.status == 200) {
        res = await res.json();
        setDone("تم التمديد بنجاح");
        setTimeout(() => {
          setDone("");
          window.location.replace("/addRent");
        }, [2000]);
        setError("");
      } else {
        res = await res.json();
        //setError(res);
      }
    }
  };

  return (
    <div className={style.Fcont}>
      <Referral
        show={show}
        setShow={setShow}
        type={type}
        setBuilding={setBuilding}
        setShow2={setShow2}
      />
      <E7ala
        show={show2}
        setShow={setShow2}
        setShow2={setShow}
        buildname={building?.name}
        price={price}
        setPrice={setPrice}
        to={to}
        setTo={setTo}
        from={from}
        setFrom={setFrom}
        contractType={contractType}
        setContractType={setContractType}
        amount={amount}
        setAmount={setAmount}
        purpose={purpose}
        setPurpose={setPurpose}
        period={period}
        setPeriod={setPeriod}
        setRentPeriod={setRentPeriod}
        rentPeriod={rentPeriod}
        setTimeToPay={setTimeToPay}
        timeToPay={timeToPay}
      />
      <ClientModal setShow3={setShow3} show3={show3} setClient={setClient} />

      <div className={style.Ftop}>
        <Link
          to="/addRent"
          className={style.lnk}
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
        <Link to="/addAkar" className={style.lnk2}>
          إضافة عقار
        </Link>
      </div>
      <hr
        style={{ color: "#798db5", width: "100%", marginBottom: "40px" }}
      ></hr>
      <div className={style.Forms}>
        <form style={{ width: "80%", margin: "auto" }}>
          <h3 style={{ marginBottom: "70px" }}> بيانات الإحالة</h3>
          <label>اسم العقار </label>
          <input
            type="text"
            disabled
            value={building?.name}
            style={{ padding: "10px" }}
          ></input>
          <label>اسم المستأجر </label>
          <input
            type="text"
            disabled
            value={client?.name}
            style={{ padding: "10px" }}
          ></input>
          <label>نوع العملية </label>
          <select
            style={{ width: "83%" }}
            name="akar"
            id="akar"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="ايجار" selected>
              ايجار
            </option>
            <option value="تمديد">تمديد</option>
          </select>
          {type == "تمديد" && (
            <>
              <label> تمديد حتي</label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </>
          )}

          <div
            className={style.plus}
            style={{
              marginBottom: "15px",
            }}
          >
            <p style={{ color: "#798DB5" }}>اخـتيـار عـقـــار </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShow(true);
              }}
              style={{
                width: "35px",
                backgroundColor: "white",
                color: "black",
                height: "35px",
                margin: "0px",
                marginLeft: "10px",
                padding: "0px",
                textAlign: "center",
                border: "1px solid #798DB5",
              }}
            >
              {" "}
              +
            </button>
          </div>
          <div className={style.plus}>
            <p style={{ color: "#798DB5" }}> اختيار مستأجر </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShow3(true);
              }}
              style={{
                width: "35px",
                backgroundColor: "white",
                color: "black",
                height: "35px",
                margin: "0px",
                marginLeft: "10px",
                padding: "0px",
                textAlign: "center",
                border: "1px solid #798DB5",
              }}
            >
              {" "}
              +
            </button>
          </div>
          <button type="submit" onClick={(e) => submit(e)}>
            {type == "ايجار" ? "ايجار" : "تمديد"}
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
