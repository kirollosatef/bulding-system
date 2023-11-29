import React, { useEffect, useState } from "react";
import style from "./Notifications.module.css";
import style2 from "../Akar/Referral.module.css";
import { useNavigate } from "react-router-dom";
export default function Notifications(props) {
  if (props.setSide) props.setSide(true);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let getData = async () => {
      let token = localStorage.getItem("auth");
      let res = await fetch(
        `${process.env.REACT_APP_API_ROOT}/rent/notifications?page=${page}`,
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
      setNotifications(res);
    };
    getData();
  }, [page, change]);
  function englishToArabicDigits(number, check) {
    if (!number) return;
    const digitsMap = {
      0: "٠",
      1: "١",
      2: "٢",
      3: "٣",
      4: "٤",
      5: "٥",
      6: "٦",
      7: "٧",
      8: "٨",
      9: "٩",
    };
    let answer = number
      .toString()
      .replace(/[0-9]/g, (match) => digitsMap[match]);
    let result = answer;
    if (check) result = answer.split("-").reverse().join("-");
    return result;
  }

  const handleSubmit = async (not) => {
    let token = localStorage.getItem("auth");

    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/rent/extendPeriod`,
      {
        method: "POST",
        body: JSON.stringify({
          clientName: not.client?.name,
          buildingName: not.building?.name,
        }),
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
    console.log(res);
  };

  return (
    <div className={style.Noti}>
      <div className={style.top}>
        <button style={{ visibility: "hidden" }}>مسح الكل</button>
        <h4> الاشعارات</h4>
      </div>
      <hr
        style={{
          width: "62%",
          margin: "auto",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      ></hr>
      {notifications.map((not) => {
        return (
          <div key={not._id} className={style.notCard}>
            <button
              onClick={() => {
                window.location.replace(`https://wa.me/${not.client?.phone}`);
              }}
            >
              تواصل
            </button>
            <div className={style.left}>
              <h6>
                {" "}
                {not.client?.name} - {not.client?.phone} - {not.client?.address}
              </h6>
              <h5>
                يرجى إعلام المستأجر عن دفع قسم بتاريخ{" "}
                {englishToArabicDigits(not.to.slice(0, 10), 1)} عن العقار المرقم{" "}
                {not.building?.number}
              </h5>
            </div>
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
  );
}
