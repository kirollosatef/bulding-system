import logo from "./logo.svg";
import "./App.css";
import { Button, Stack } from "react-bootstrap";
import Login from "./Components/Auth/Login";
import Side from "./Components/NavBar/Side";
import Nav from "./Components/NavBar/Nav";
import Notifications from "./Components/Notifications/Notifications";
import Forms from "./Components/AddForms/Forms";
import Akar from "./Components/Akar/Add";
import Referral from "./Components/Akar/Referral";
import RentInfo from "./Components/RentInfo/RentInfo";
import Info from "./Components/Akar/Info";
import Payments from "./Components/Payments.js/Payments";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import { useEffect, useState } from "react";
import Reports from "./Components/Reports/Reports";
import Home from "./Components/Home/Home";
import Rented from "./Components/Akar/Rented";
import Clients from "./Components/Clients/Clients";
import ClientModal from "./Components/Clients/ClientModal";
import { Business } from "./Components/Contracts/Business";
import { Industrial } from "./Components/Contracts/Industrial";
import { Flat } from "./Components/Contracts/Flat";

function App() {
  const [toggel, setToggel] = useState(false);
  const [user, setUser] = useState();
  const [show, setShow] = useState(true);

  return (
    <>
    {console.log(process.env.REACT_APP_API_ROOT)}
      {show ? (
        <>
          <Side
            user={user}
            setUser={setUser}
            toggel={toggel}
            setToggel={setToggel}
          />
          <Nav user={user} />
        </>
      ) : (
        <></>
      )}

      <Routes>
        <Route exact path="/signin" element={<Login setShow={setShow} />} />
        <Route exact path="/signup" element={<Signup setShow={setShow} />} />
        <Route
          exact
          path="/rentinfo"
          element={<RentInfo setSide={setShow} />}
        />
        <Route exact path="/akarinfo" element={<Info setSide={setShow} />} />
        <Route exact path="/rented" element={<Rented setSide={setShow} />} />
        <Route exact path="/payment" element={<Payments setSide={setShow} />} />
        <Route
          exact
          path="/addclient"
          element={<Clients setSide={setShow} />}
        />
        <Route
          exact
          path="/addAkar"
          element={<Akar setSide={setShow} user={user} />}
        />
        <Route exact path="/addRent" element={<Forms setSide={setShow} />} />
        <Route
          exact
          path="/notifications"
          element={<Notifications setSide={setShow} />}
        />
        <Route exact path="/reports" element={<Reports setSide={setShow} />} />
        <Route
          exact
          path="/business/:id"
          element={<Business setShow={setShow} />}
        />
        <Route
          exact
          path="/industrial/:id"
          element={<Industrial setShow={setShow} />}
        />
        <Route exact path="/flat/:id" element={<Flat setShow={setShow} />} />
        <Route exact path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
