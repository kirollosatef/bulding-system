import React, { useEffect, useState } from "react";
import style from "./Nav.module.css";
import { useNavigate } from "react-router-dom/dist";
import jwtDecode from "jwt-decode";

export default function Side({ user, setUser, toggel, setToggel }) {
  const navigate = useNavigate();

  const handelToggel = () => {
    if (toggel && window.innerWidth < 748) return;
    setToggel(toggel ? false : true);
  };

  const logout = () => {
    setUser("");
    localStorage.removeItem("auth");
    navigate("/");
  };

  useEffect(() => {
    let token = localStorage.getItem("auth");
    if (token) {
      token = jwtDecode(token);
      if (token) setUser(token);
    } else navigate("/signin");
  }, []);

  return (
    <div
      className={style.Side}
      style={{ width: toggel ? "5%" : "15%", minWidth: "50px" }}
    >
      <div className={style.tab} onClick={handelToggel}>
        <p>
          <img src="topmenu.png" width={"40px"} />
        </p>
      </div>
      <hr style={{ color: "white", marginBottom: "0px" }}></hr>
      <div className={style.tab} onClick={() => navigate("/notifications")}>
        {toggel ? (
          <img src="bell.png" />
        ) : (
          <p>
            <span>الاشعارات &nbsp;</span>
            <img src="bell.png" />
          </p>
        )}
      </div>
      <div className={style.tab} onClick={() => navigate("/rentinfo")}>
        {toggel ? (
          <img src="group.png" />
        ) : (
          <p>
            <span>معلومات المستأجرين&nbsp;</span>
            <img src="group.png" />
          </p>
        )}
      </div>
      <div className={style.tab} onClick={() => navigate("/akarinfo")}>
        {toggel ? (
          <img src="home.png" />
        ) : (
          <p>
            <span> العقارات المتاحه &nbsp;</span>
            <img src="home.png" />
          </p>
        )}
      </div>
      <div className={style.tab} onClick={() => navigate("/rented")}>
        {toggel ? (
          <img src="home.png" />
        ) : (
          <p>
            <span>العقارات المستأجره &nbsp;</span>
            <img src="home.png" />
          </p>
        )}
      </div>
      <div className={style.tab} onClick={() => navigate("/addAkar")}>
        {toggel ? (
          <img src="add.png" />
        ) : (
          <p>
            <span>اضافه جديد&nbsp;</span>
            <img src="add.png" />
          </p>
        )}
      </div>
      <div className={style.tab} onClick={() => navigate("/payment")}>
        {toggel ? (
          <img src="money.png" />
        ) : (
          <p>
            <span> الحسابات&nbsp;</span>
            <img src="money.png" />
          </p>
        )}
      </div>
      {/* <div className={style.tab} onClick={() => navigate("/reports")}>
        {toggel ? <img src="file.png" /> :
          <p>
            <span> التقارير&nbsp;</span>
            <img src="file.png" />
          </p>
        }
      </div> */}
      {/* <div className={style.tab}>
        <p> {!toggel && "المهام الوظيفيه{&nbsp;}}
          <img src="menu.png" />
        </p>
      </div> */}
      <hr style={{ color: "white", marginBottom: "0px" }}></hr>
      {/* <div className={style.tab}>
        {toggel ? <img src="edit.png" /> :
          <p>
            <span> الاعدادات&nbsp;</span>
            <img src="edit.png" />
          </p>
        }
      </div> */}
      {user ? (
        <div className={style.tab} onClick={logout}>
          {toggel ? (
            <img src="exit.png" />
          ) : (
            <p>
              <span> الخروج&nbsp;</span>
              <img src="exit.png" />
            </p>
          )}
        </div>
      ) : (
        <div className={style.tab} onClick={() => navigate("/signin")}>
          {toggel ? (
            <img src="login.png" width={"40px"} />
          ) : (
            <p>
              <span> تسجيل الدخول&nbsp;</span>
              <img src="login.png" width={"40px"} />
            </p>
          )}
        </div>
      )}
    </div>
  );
}
