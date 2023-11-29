import React, { useEffect, useState } from "react";
import style from "./Rent.module.css";
import { useNavigate } from "react-router-dom/dist";
import { Button, Modal } from "react-bootstrap";

export default function (props) {
  if (props.setSide) props.setSide(true);
  const [nameS, setNameS] = useState();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [notes, setNotes] = useState();
  const [address, setAddress] = useState();
  const [client, setClient] = useState();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };
  const handleClose2 = () => {
    setShow2(false);
  };
  let token = localStorage.getItem("auth");
  let getData = async (page) => {
    if (page == 0) return;
    let res;
    if (!nameS) {
      res = await fetch(
        `${process.env.REACT_APP_API_ROOT}/client?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
    } else {
      res = await fetch(
        `${process.env.REACT_APP_API_ROOT}/client/search?page=${page}`,
        {
          method: "POST",
          body: JSON.stringify({
            name: nameS,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
    }
    if (res.status != 200) {
      navigate("/signin");
      return;
    }
    res = await res.json();
    if (res.length) {
      setUsers(res);
      setPage(page);
    }
  };
  useEffect(() => {
    getData(1);
  }, []);

  const deletClient = async () => {
    let res = await fetch(`${process.env.REACT_APP_API_ROOT}/client/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (res.status == 200) {
      getData(1);
      setShow(false);
    }
  };
  const editClient = async () => {
    let res = await fetch(`${process.env.REACT_APP_API_ROOT}/client/`, {
      method: "PATCH",
      body: JSON.stringify({
        id:client._id,
        name,
        phone,
        address,
        notes,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (res.status == 200) {
      getData(1);
      setShow2(false);
    }
  };
  const search = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth");
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/client/search?page=${page}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: nameS,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      res = await res.json();
      setUsers(res);
    }
  };

  return (
    <>
      <div className={style.RentContainer}>
        <div className={style.top}>معلومات المستأجرين </div>
        <form className={style.btns}>
          <input
            type="text"
            placeholder="ابحث عن مستأجر"
            style={{ width: "63%", padding: "5px" }}
            onChange={(e) => setNameS(e.target.value)}
          ></input>
          <button type="submit" onClick={(e) => search(e)}>
            بحث
          </button>
        </form>
        <div className={style.girdTablefour} style={{ marginTop: "50px" }}>
          <div className={style.girdItem}>حذف / تعديل</div>
          <div className={style.girdItem}>ملاحظات</div>
          <div className={style.girdItem}>رقم الهاتف</div>
          <div className={style.girdItem}>العنوان/السكن</div>
          <div className={style.girdItem}>الاسم</div>
        </div>
        {users.map((user) => {
          return (
            <div key={user._id} className={style.girdTable2four}>
              <div className={style.girdItem2}>
                <button
                  onClick={() => {
                    setClient(user);
                    setShow2(true);
                  }}
                  style={{
                    backgroundColor: "#071a3e",
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: "2px",
                  }}
                >
                  تعديل
                </button>
                <button
                  onClick={() => {
                    setId(user._id);
                    setShow(true);
                  }}
                  style={{
                    marginLeft: "5px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  class="btn btn-danger"
                >
                  حذف
                </button>
              </div>
              <div className={style.girdItem2}>{user.notes}</div>
              <div className={style.girdItem2}>{user.phone}</div>
              <div className={style.girdItem2}>{user.address}</div>
              <div className={style.girdItem2}>{user.name}</div>
            </div>
          );
        })}
        <div className={style.btns}>
          <button
            onClick={() => getData(page + 1)}
            style={{ marginBottom: "25px" }}
          >
            التالي
          </button>
          <button
            onClick={() => getData(page - 1)}
            style={{ marginBottom: "25px" }}
          >
            الرجوع
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "40%", fontWeight: "bold" }}>
            تأكيد الحذف
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            اغلاق
          </Button>
          <Button variant="danger" onClick={() => deletClient()}>
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "40%", fontWeight: "bold" }}>
            تعديل بيانات العقار
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "bold", textAlign: "right" }}>
          <form class="form-group" onSubmit={editClient}>
            <label> الاسم</label>
            <input
              type="text"
              class="form-control"
              placeholder={client?.name}
              style={{
                textAlign: "right",
                marginTop: "10px",
                marginBottom: "5px",
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <label> رقم الهاتف</label>
            <input
              type="text"
              class="form-control"
              placeholder={client?.phone}
              style={{
                textAlign: "right",
                marginTop: "10px",
                marginBottom: "5px",
              }}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label> العنوان</label>
            <input
              type="text"
              class="form-control"
              placeholder={client?.address}
              style={{
                textAlign: "right",
                marginTop: "10px",
                marginBottom: "5px",
              }}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label> الملاحظات</label>
            <input
              type="text"
              class="form-control"
              placeholder={client?.notes}
              style={{
                textAlign: "right",
                marginTop: "10px",
                marginBottom: "5px",
              }}
              onChange={(e) => setNotes(e.target.value)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            اغلاق
          </Button>
          <Button variant="primary" onClick={() => editClient()}>
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
