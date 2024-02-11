import React, { useEffect, useState } from 'react'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ setShow }) {

  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState("")
  const [check,setCheck] = useState(false)
  const navigate = useNavigate()


  const login = async (e) => {
    e.preventDefault()
    setCheck(true)
    let res = await fetch(`${process.env.REACT_APP_API_ROOT}/auth/signin`, {
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
      localStorage.setItem("auth", token.token);
      setShow(true)
      navigate("/addAkar")
    } else{
      setCheck(false)
      setError(token)
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("auth");
    if (token) {
      if (token) navigate("/addAkar")
      else setShow(false)
    }
    else setShow(false)

  }, [])

  return (
    <form className={style.container}>
      <h1>تسجيل الدخول</h1>
      <h4>مديرية بلدية السماوات، شعبة الواردات ترحب بكم 👋</h4>
      <h6>لتسجيل الدخول برجاء إدخال هذه البيانات</h6>
      <label>اسم المستخدم</label>
      <input type='text' placeholder='ادخل اسمك هنا' onChange={(e) => setName(e.target.value)} />
      <label> كلمه السر</label>
      <input type='password' placeholder='ادخل كلمه السر هنا' onChange={(e) => setPassword(e.target.value)} />
      <button type='submit' onClick={login}>{check ? <span className={style.loader} /> : "دخـول"}</button>
      {/* <h4> لا تمتلك حساب؟ <Link to="/signup">قم بانشاء حساب</Link></h4> */}
      <p>{error}</p>
    </form>
  )
}
