import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./Contract.module.css";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { tafqeet } from "../Akar/Tafqeet";

export const Business = (props) => {
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
                style={{ width: "200px", height: "200px" }}
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
            <div style={{ marginBottom: "5px" }}>.نظم العقد بين الطرفين </div>
            <div>
              الطرف الأول مدير بلدية السماوة وكالة السيد / حيدر عناد حسين
            </div>
            <div style={{ marginBottom: "40px" }}>
              الطرف الثاني السيد / {data.client.name}
            </div>
            <div style={{ marginBottom: "10px" }}>
              : وتم الاتفاق بينهما على الشروط التالية
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١- {"   "} محل ( {englishToArabicDigits(data.building.number, 0)}{" "}
              ) على القطعة المرقمة ( {data.building.location}) والبالغ مساحته (
              {englishToArabicDigits(data.building.area, 0)}) والمدونة في سجل
              الأملاك الاساسي لمدة ( {englishToArabicDigits(data.period)} )
              أعتبــــــار مــــــــــــن{" "}
              {englishToArabicDigits(data.from.slice(0, 10), 1)} ببدل ايـجار
              قدره رقما ( {englishToArabicDigits(data.amount, 0)} ) و كتابتا (
              {tafqeet(data.amount)}) وذلك لغرض اتخاذه ( {data.purpose} )
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٢- ليس للمستأجر أن يستعمل المأجور لغير الغرض الذي وقع هذا العقد من
              أجله وليس له أن يتعمد ألاتيان بعمل من شأنه ألإضرار بالمأجور وإذا
              خالف فللمؤجر الحق في فسخ العقد دون أن يكون ملزماً بتعويض ودون
              الرجوع للمحاكم .
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٣- للمؤجر الحق بفسخ العقد في أي وقت خلال مدة الإيجار وذلك بأخبار
              المستأجر تحريريا
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٤- لايلزم المؤجر بأي مبلغ ينفقه المستأجر لترميم المأجور أو أصلاحه
              أو ماشاكل ويكون المستأجر متبرعاً بذلك المبلغ ولايجوز له أجراء
              تغيرات أساسية في المأجور الابعد ابلاغ موافقة المؤجر التحريرية
              وتصبح الترميمات جزءا من المؤجر ليس له الحق عند تخلية الماجور أو
              المطالبة بثمنها
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٥- أذا حدث خلل كلي في الماجور يفقد الانتفاع به نهائياً بالنسبة
              لحالته عند التوقيع فاللمؤجر المطالبة بأصلاح الخلل وأرجاع الملك الى
              وضعه السابق وعلى المستأجر أن يتخذ مايلزم بأسرع وقت ممكن للمؤجر
              الحق بفسخ العقد من تاريخ وقوع ذلك الخلل دون الرجوع الى المحاكم
              ومطالبته بقيمة الاضرار التي لحقت بالمأجور
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٦- يتعهد المستأجر بالمحافظة على الماجور خلال مدة الايجار ويكون
              ملزماً بكافة الترميمات الطفيفة خلال مدة الايجار كتصليح المصابيح
              والاقفال والزجاج المكسور وكذلك عن كلفة الدهونات والنقوش الداخلية
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٧- يتعهد المستأجر بدفع أجور الماء والكهرباء وأجور تنظيف المجاري
              وكافة الرسوم المقررة بموجب القوانيين
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٨- يتعهد المستأجر بتسليم الماجور الى المؤجر بالحالة التي أستلمه
              عند نفاذ مدة العقد أو التخلية بموجب الفقرة الثالثة من هذا العقد
              على أن تكون التركيبات الثابتة للماجور بحالة جيدة وصالحة وعلى
              المستأجر أكمال ككافة النواقص الاخرى
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٩- لا يحق للمستأجر أيجار الماجور الى غيره بالباطن بدون موافقة
              المؤجر التحريرية
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٠- أذا تأخر المستأجر عن تسليم الماجور في اليوم الذي تنتهي فيه مدة
              الايجار فيكون ملزماً بتادية أجر مثل مضافا اليه ٥٠% دون الحاجة الى
              أنذار من قبل كاتب العدل وكذلك ماجاء بالفقرة الثالثة
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١١- يتعهد المستأجر بالسماح لدخول المؤجر في أي وقت شاء بقصد رؤيته
              وسلامته من كافة الاضرار وعند وجود مايستوجب التصليح تبليغ المستأجر
              تحريرياً وعليه أكمال الخلل الحاصل بالماجور خلال مدة (١٥) يوماً من
              تاريخ التبليغ
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٢- يتعهد المستأجر بقبول كافة التعليمات التي تصدرها المراجع العليا
              باعتبارها شرطاً مضافاً للعقد
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٣- للمؤجر الحق بفسخ العقد أذا ثبت ان المستاجر قد أخل بشروط العقد
              أعلاه وليس له الحق بالمطالبة بأي تعويض ولا استرداد بدل الايجار عن
              المدة المتبقية من مدة العقــد
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٤- المستأجر ملزم بتنفيذ الشروط الواردة في البيان والاعلان
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٥- في حالة تاخر المستاجر عن دفع القصد المستحق لمدة شهر واحد من
              تاريخ استحقاقه فاللطرف الاول حق فسخ العقد دون الحاجة الى انذارهم
            </div>
          </div>

          <div className={style.qr}>
            <QRCode
              value={`http://${window.location.hostname}/business/${id}`}
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
