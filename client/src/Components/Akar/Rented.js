import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import style from "../RentInfo/Rent.module.css";
import style2 from "./Rented.module.css";
import { useNavigate } from "react-router-dom/dist";
import { Button } from "react-bootstrap";
export default function Rented(props) {
  if (props.setSide) props.setSide(true);
  const [page, setPage] = useState(1);
  const [number, setNumber] = useState();
  const [type, setType] = useState();
  const [builds, setBuilds] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [rent, setRent] = useState();
  const [to, setTo] = useState();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };
  const handleClose2 = () => {
    setShow2(false);
  };
  const handleClose3 = () => {
    setShow3(false);
  };
  const handleClose4 = () => {
    setShow4(false);
  };
  const handleClose5 = () => {
    setShow5(false);
  };
  const handleClose6 = () => {
    setShow6(false);
  };
  useEffect(() => {
    let getData = async () => {
      let token = localStorage.getItem("auth");
      if (!token) navigate("/signin");
      let res;
      if (number) {
        res = await fetch(
          `${process.env.REACT_APP_API_ROOT}/building/search?page=${page}`,
          {
            method: "POST",
            body: JSON.stringify({
              number,
              type,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        res = await fetch(
          `${process.env.REACT_APP_API_ROOT}/rent/buildings/?page=${page}`,
          {
            method: "GET",
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
      setBuilds(res);
      console.log(res);
    };
    getData();
  }, [page]);

  const search = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth");
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/rent/search/?page=${page}`,
      {
        method: "POST",
        body: JSON.stringify({
          number,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      res = await res.json();

      console.log(res);
      setBuilds(res);
    }
  };

  const extend = async () => {
    let token = localStorage.getItem("auth");
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/rent/extendPeriod`,
      {
        method: "POST",
        body: JSON.stringify({
          rentId: rent._id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      setShow2(false);
      setShow5(true);
    }
  };

  const extendTo = async () => {
    let token = localStorage.getItem("auth");
    let res = await fetch(`${process.env.REACT_APP_API_ROOT}/rent/extend`, {
      method: "POST",
      body: JSON.stringify({
        rentId: rent._id,
        to,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    // console.log(res.status);
    if (res.status == 200) {
      setShow(false);
      setShow6(true);
    }
  };

  const delet = async () => {
    let token = localStorage.getItem("auth");
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/rent/${rent._id}/${rent.building._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className={style.RentContainer} style={{ width: "78%" }}>
        <div className={style.top}>معلومات العقارات</div>
        <form className={style2.btns} style={{ width: "70%" }}>
          <input
            type="text"
            placeholder="اختار رقم العقار"
            style={{ width: "45%", padding: "15px" }}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          {/* <select
            style={{ width: "35%", padding: "5px" }}
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
          </select> */}

          <button onClick={(e) => search(e)}>بحث</button>
        </form>
        <div
          className={style2.girdTablesix}
          style={{ width: "100%", marginTop: "50px" }}
        >
          <div className={style2.girdItem}>طباعه</div>
          <div className={style2.girdItem}>تسديد/تمديد</div>
          <div className={style2.girdItem}>حذف</div>
          <div className={style2.girdItem}>اسم المستأجر</div>
          <div className={style2.girdItem}>مساحة</div>
          <div className={style2.girdItem}>رقم القطعة</div>
          <div className={style2.girdItem}>رقم العقار</div>
          <div className={style2.girdItem}>اسم العقار</div>
          <div className={style2.girdItem}>#</div>
        </div>
        {builds.map((build, index) => {
          if (!build.building) {
          } else
            return (
              <div
                key={index}
                className={style2.girdTable2six}
                style={{ width: "100%" }}
              >
                <div className={style2.girdItem2}>
                  <button
                    onClick={() => {
                      if(build.type == "صناعي") navigate(`/industrial/${build._id}`)
                      else if(build.type == "تجاري") navigate(`/business/${build._id}`)
                      else navigate(`/flat/${build._id}`)
                    }}
                    style={{
                      backgroundColor: "#071a3e",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    طباعه
                  </button>
                </div>
                <div className={style2.girdItem2}>
                  <button
                    onClick={() => {
                      setRent(build);
                      setShow(true);
                    }}
                    style={{
                      marginBottom: "2px",
                      backgroundColor: "#071a3e",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    تمديد
                  </button>
                  <button
                    onClick={() => {
                      setRent(build);
                      setShow2(true);
                    }}
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                    }}
                    className="btn btn-success"
                  >
                    تسديد
                  </button>
                </div>
                <div className={style2.girdItem2}>
                  {/* <button
                    onClick={() => {
                      setShow4(true);
                    }}
                    style={{
                      backgroundColor: "#071a3e",
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "2px",
                    }}
                  >
                    تعديل
                  </button> */}
                  <button
                    onClick={() => {
                      setRent(build);
                      setShow3(true);
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
                <div className={style2.girdItem2}>{build.client?.name} </div>
                <div className={style2.girdItem2}>{build.building.area}</div>
                <div className={style2.girdItem2}>
                  {build.building.pieceNumber}
                </div>
                <div className={style2.girdItem2}>{build.building.number}</div>
                <div className={style2.girdItem2}>{build.building.name}</div>
                <div className={style2.girdItem2}>{index}</div>
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "40%", fontWeight: "bold" }}>
            تمديد
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "bold", textAlign: "right" }}>
          <div class="form-group">
            <label> :تمديد حتي</label>
            <input
              type="date"
              class="form-control"
              placeholder="اسم العميل"
              style={{ textAlign: "right", marginTop: "10px" }}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            اغلاق
          </Button>
          <Button variant="primary" onClick={() => extendTo()}>
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Tasded Modal */}
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "40%", fontWeight: "bold" }}>
            تأكيد التسديد
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            اغلاق
          </Button>
          <Button variant="primary" onClick={() => extend()}>
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal */}
      <Modal show={show3} onHide={handleClose3} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "40%", fontWeight: "bold" }}>
            تأكيد الحذف
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            اغلاق
          </Button>
          <Button variant="danger" onClick={() => delet()}>
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal show={show4} onHide={handleClose4} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "40%", fontWeight: "bold" }}>
            تأكيد الحذف
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "bold", textAlign: "right" }}>
          <div class="form-group">
            <label> :تمديد حتي</label>
            <input
              type="date"
              class="form-control"
              placeholder="اسم العميل"
              style={{ textAlign: "right", marginTop: "10px" }}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            اغلاق
          </Button>
          <Button variant="primary" onClick={() => extendTo()}>
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Extend Modal */}
      <Modal show={show5} onHide={handleClose5}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            تأكيد السداد
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="alert alert-success" role="alert">
            تم السداد بنجاح
          </div>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose5}>
            اغلاق
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ExtendTo Modal */}
      <Modal show={show6} onHide={handleClose6}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            تأكيد السداد
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="alert alert-success" role="alert">
            تم التمديد بنجاح
          </div>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose6}>
            اغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
