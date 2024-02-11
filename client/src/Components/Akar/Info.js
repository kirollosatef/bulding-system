import React, { useEffect, useState } from "react";
import style from "../RentInfo/Rent.module.css";
import style2 from "../Akar/info.module.css";
import { useNavigate } from "react-router-dom/dist";
import { Button, Modal } from "react-bootstrap";
import Forms from "../AddForms/Forms";
export default function Info(props) {
  if (props.setSide) props.setSide(true);
  const [clk, setClk] = useState(false);
  const [page, setPage] = useState(1);
  const [numberS, setNumberS] = useState();
  const [typeS, setTypeS] = useState();
  const [builds, setBuilds] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [building, setBuilding] = useState();

  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [location, setLocation] = useState();
  const [number, setNumber] = useState();
  const [type, setType] = useState();
  const [pieceNumber, setPieceNumber] = useState();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };
  const handleClose2 = () => {
    setShow2(false);
  };
  let getData = async (page) => {
    if (page == 0) return;
    let token = localStorage.getItem("auth");
    let res;
    if (numberS && typeS) {
      res = await fetch(
        `${process.env.REACT_APP_API_ROOT}/building/search?page=${page}`,
        {
          method: "POST",
          body: JSON.stringify({
            number: numberS,
            type: typeS,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
    } else {
      res = await fetch(
        `${process.env.REACT_APP_API_ROOT}/building/available?page=${page}`,
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
    if (res.length) {
      setBuilds(res);
      setPage(page);
    }
  };

  useEffect(() => {
    getData(1);
  }, []);
  let token = localStorage.getItem("auth");

  const search = async (e) => {
    e.preventDefault();
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/building/search?page=${page}`,
      {
        method: "POST",
        body: JSON.stringify({
          number: numberS,
          type: typeS,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      res = await res.json();
      setBuilds(res);
    }
  };
  const delet = async () => {
    if (!building) return;
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/building/${building._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log(res.status);
    if (res.status == 200) {
      window.location.reload();
    }
  };

  const edit = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/building/${building._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          buildingId: building._id,
          name,
          type,
          number,
          pieceNumber,
          location,
          area,
        }),
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
  if (!clk)
    return (
      <>
        <div className={style.RentContainer}>
          <div className={style.top}>معلومات العقارات</div>
          <form className={style2.btns} style={{ width: "80%" }}>
            <input
              type="text"
              placeholder="اختار رقم العقار"
              style={{ width: "35%", padding: "10px" }}
              onChange={(e) => setNumberS(e.target.value)}
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
            <div className={style2.girdItem}>تعديل / حذف </div>
            <div className={style2.girdItem}>احاله</div>
            <div className={style2.girdItem}>مساحة</div>
            <div className={style2.girdItem}>رقم القطعة</div>
            <div className={style2.girdItem}>رقم العقار</div>
            <div className={style2.girdItem}>اسم العقار</div>
            <div className={style2.girdItem}>#</div>
          </div>
          {builds.map((build, index) => {
            return (
              <div
                key={index}
                className={style2.girdTable2six}
                style={{ width: "100%" }}
              >
                <div className={style2.girdItem2} style={{ overflowY: "auto" }}>
                  <button
                    onClick={() => {
                      setBuilding(build);
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
                      setBuilding(build);
                      setShow(true);
                    }}
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                    }}
                    className="btn btn-danger"
                  >
                    حذف
                  </button>
                </div>
                <div className={style2.girdItem2}>
                  <button
                    onClick={() => {
                      setBuilding(build);
                      setClk(true);
                    }}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    className="btn btn-success"
                  >
                    احاله
                  </button>
                </div>
                <div className={style2.girdItem2}>{build.area}</div>
                <div className={style2.girdItem2}>{build.pieceNumber}</div>
                <div className={style2.girdItem2}>{build.number}</div>
                <div className={style2.girdItem2}>{build.name}</div>
                <div className={style2.girdItem2}>{index + 1}</div>
              </div>
            );
          })}
          <div className={style2.btns}>
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
        {/* Delete Modal */}
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
            <Button variant="danger" onClick={() => delet()}>
              تأكيد
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Edit Modal */}
        <Modal show={show2} onHide={handleClose2} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ marginLeft: "40%", fontWeight: "bold" }}>
              تعديل بيانات العقار
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontWeight: "bold", textAlign: "right" }}>
            <form class="form-group" onSubmit={edit}>
              <label> الاسم</label>
              <input
                type="text"
                class="form-control"
                placeholder={building?.name}
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <label> المساحة</label>
              <input
                type="text"
                class="form-control"
                placeholder={building?.area}
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                onChange={(e) => setArea(e.target.value)}
              />
              <label> الموقع</label>
              <input
                type="text"
                class="form-control"
                placeholder={building?.location}
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label> الرقم</label>
              <input
                type="text"
                class="form-control"
                placeholder={building?.number}
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                onChange={(e) => setNumber(e.target.value)}
              />
              <label> رقم المقاطعه</label>
              <input
                type="text"
                class="form-control"
                placeholder={building?.pieceNumber}
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                onChange={(e) => setPieceNumber(e.target.value)}
              />
              <label> النوع </label>
              <select
                class="form-select"
                onChange={(e) => setType(e.target.value)}
                style={{ textAlign: "right" }}
              >
                <option selected>{building?.type}</option>
                <option value="بارك">بارك</option>
                <option value="كشك">كشك</option>
                <option value="محل">محل</option>
                <option value="مساطحه">مساطحه</option>
              </select>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              اغلاق
            </Button>
            <Button variant="primary" onClick={() => edit()}>
              تأكيد
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  else {
    return <Forms building={building} />;
  }
}
