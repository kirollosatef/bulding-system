import React, { useEffect, useState } from 'react'
import style from './Login.module.css'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default function Signup({setShow}) {

  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState("")
  const navigate = useNavigate()


  const signup = async () => {

    let res = await fetch(`${process.env.REACT_APP_API_ROOT}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    let token = await res.json();
    if (res.status == 200) {
      navigate("/signin")
    } else setError(token)
  };

  useEffect(() => {
    let token = localStorage.getItem("auth");
    if (token) {
      token = jwtDecode(token)
      if (token) navigate("/addAkar")
      else setShow(false)
    }
    else setShow(false)

  }, [])

  return (
    <div className={style.container}>
      <h1>حساب جديد</h1>
      <h4>مديرية بلدية السماوه، شعبة الواردات ترحب بكم 👋</h4>
      <h6>لعمل حساب جديد برجاء إدخال هذه البيانات</h6>
      <label>اسم المستخدم</label>
      <input type='text' placeholder='ادخل اسمك هنا' onChange={(e) => setName(e.target.value)} />
      <label> كلمه السر</label>
      <input type='password' placeholder='ادخل كلمه السر هنا' onChange={(e) => setPassword(e.target.value)} />
      <button type='submit' onClick={signup}>عمل حساب</button>
      <h4> هل تمتلك حساب بالفعل؟ <Link to="/signin">قم بتسجيل الدخول</Link></h4>
      <p>{error}</p>
    </div>
  )
}
