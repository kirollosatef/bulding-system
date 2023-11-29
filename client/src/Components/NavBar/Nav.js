import React, { useEffect, useState } from "react";
import style from "./Nav.module.css";
export default function Nav({ user }) {

  return (
    <div className={style.Nav}>
      <img src={user ? user.image : "https://img.freepik.com/free-icon/user_318-159711.jpg"} />
      <h5>{user?.name}</h5>
    </div>
  );
}
