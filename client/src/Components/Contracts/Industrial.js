import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./Contract.module.css";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import { tafqeet } from "../Akar/Tafqeet";

export const Industrial = (props) => {
  const componentRef = useRef();
  const [wdth, setWidth] = useState("90%");
  const navigate = useNavigate();
  props.setShow(false);
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "SMV",
  });
  const [id, setId] = useState(useParams().id || "64c10d138f5c662102fc3ea9");
  const [data, setMyData] = useState(null);
  useEffect(() => {
    const getDate = async () => {
      let res = await fetch(`${process.env.REACT_APP_API_ROOT}/rent/${id}`);
      if (res.ok) {
        res = await res.json();
        setMyData(res);
        console.log(res);
      }
    };
    getDate();
  }, []);
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

  if (!data) return <div className={style.loader}></div>;

  return (
    <>
      <div className={style.nav}>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          X
        </button>
      </div>
      <div className={style.tmp}></div>
      <div className={style.topContainer}>
        <div
          ref={componentRef}
          className={style.toPrint}
          style={{ width: wdth }}
          name={id}
        >
          <div className={style.nameOfAllah}>
            <b>
              بـــــــــــــــــــــــــسم الله الرحـــــــــــــــــــمن
              الرحـــــــــــــــــــيم
            </b>
          </div>
          <div className={style.top}>
            <div className={style.topW}>
              <div> ورقة عقد أيجار وأستئجار</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              جــــــمهوريه العـــراق
              <img
                src="https://res.cloudinary.com/dbymvhk8x/image/upload/v1697488758/ArchieveGov/ots79ofli4xbnltfxdxg.png"
                className={style.logo}
              ></img>
            </div>
            <div className={style.topW}>
              <div> وزارة البلديات والاشغال</div>
              <div> مدير بلدية السماوة</div>
            </div>
          </div>
          <hr
            style={{
              width: "90%",
              border: "2px solid black",
              marginBottom: "10px",
              margin: "auto",
            }}
          ></hr>
          <div className={style.head}>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {" "}
              عقد أيجار اصحاب الحرف الصناعي المشمولين بقرار مجلس قيادة الثورة
              المنحل المرقم ٣٨ لسنة ١٩٩٩{" "}
            </div>
            <div style={{ marginBottom: "5px" }}>.نظم العقد بين الطرفين </div>
            <div>
              الطرف الاول ( مؤجر ) / حيدر عناد حسين / مدير بلدية السماوة / وكالة{" "}
            </div>
            <div style={{ marginBottom: "40px" }}>
              الطرف الثاني ( المستأجر ) / {data.client.name}
            </div>
            <div style={{ marginBottom: "10px" }}>
              ... يتفق الطرفان على تنظيم عقد ايجار لاصحاب الصناعات او الحرف
              الصناعية المحددة بالقرار أعلاه
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١- يوافق الطرف الأول على تأجير القطعة المرقمة ({" "}
              {data.building.pieceNumber}) مقاطعة ( {data.building.location} )
              الواقعه داخل حدود البلدية ويبدل ايجار سنوي مقداره ({" "}
              {tafqeet(data.amount, 0)} ) لغرض انشاء ( {data.purpose} ) وبمساحة
              ({englishToArabicDigits(data.building.area)}) ويبقى عقد الإيجار
              نافذ طيلة استمرار المستاجر بالعمل الصناعي او الحرفي على ان يعاد
              تقدير كل خمس سنوات
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٢- يبدأ العقد اعتبارا من تاريخ الموافقة على التخصيص ويستحق بدل
              الايجار السنوي من هذا التاريخ و في حالة تاخر الطرف الثاني عن دفع
              المستحق لمدة (ثلاثة اشهر) من تاريخ استحقاقة فللطرف الاول حق فسخ
              العقد دون الحاجة الى انذاره مع احتفاظة بحق المطالبة بالبدل مع فوات
              المنفعة
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٣- يلتزم الطرف الثاني بعدم استعمال الارض لغير الذي خصصت من اجلة
              والذي نص علية في العقد ولا يحق له التأجير من الباطن وبعكسة يفسخ
              العقد ويتحمل جميع الاضرار الناجمة عن ذلك
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٤- يكون دفع بدل الايجار بنسبة لاتزيد عن 3% من قيمة الأرض للفترة من
              &nbsp;{englishToArabicDigits(data.from.slice(0, 10), 1)}{" "}
              &nbsp;ولغاية &nbsp;{" "}
              {englishToArabicDigits(data.to.slice(0, 10), 1)}
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٥- يكون دفع بدل الايجار سنوياً من تاريخ توقيع العقد
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٦- يبقى عقد الايجار نافذاً طيلة استمرار المستأجر بالعمل الصناعي او
              الحرفي في الماجور وبعكسة يتم فسخ العقد بموجب الفقرة (۳) من هذا
              العقد وتؤول المشيدات الى البلدية المعينة{" "}
            </div>
          </div>

          <div className={style.qr}>
            <QRCode
              value={`http://${window.location.hostname}/industrial/${id}`}
              style={{ height: "100px" }}
            />
            <b> بصمه الكترونيه</b>
          </div>

          <div className={style.footer}>
            <div className={style.left}>
              <div>الطـرف الاول / ر.مهندسين</div>
              <div>مـديــر البلديه / حيدر عناد حسين</div>
              <div>أضافة لوظيفته : مدير بلدية السماوة / وكالة</div>
            </div>
            <div className={style.left}>
              <div> / الطـرف الثاني</div>
              <div> الاســــــــــــــــم / {data.client.name}</div>
              <div> العنوان : {data.client.address}</div>
              <div>الهاتف : {englishToArabicDigits(data.client.phone, 0)}</div>
              <div style={{ marginTop: "30px" }}>
                الــــــــــــــــــــــــواردات
              </div>
            </div>
          </div>
          <div
            className={style.left}
            style={{
              textAlign: "right",
              fontSize: "20px",
              fontWeight: "800",
              marginRight: "40%",
              marginTop: "40px",
            }}
          >
            <div>تم تدقيقه من قبل قسم الشؤون القانونية</div>
            <div style={{ marginTop: "15px" }}>: الاســـم</div>
            <div style={{ marginTop: "15px" }}> : التوقيع</div>
            <div style={{ marginTop: "15px" }}>
              {" "}
              / &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp; &nbsp;: التاريخ{" "}
            </div>
            <div style={{ marginTop: "15px", marginBottom: "30px" }}>
              {" "}
              : الــختم
            </div>
          </div>
        </div>
      </div>
      <button className={style.btn} onClick={handelPrint}>
        طباعه
      </button>
    </>
  );
};
