import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("auth");
        if (token) {
            token = jwtDecode(token)
            if (token) navigate("/addAkar")
            else navigate("/signin")
        }
        else navigate("/signin")
    }, [])

    return (
        <>
        </>
    );
}
