import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./Contract.module.css";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import { tafqeet } from "../Akar/Tafqeet";

export const Flat = (props) => {
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
            <div style={{ marginBottom: "5px" }}>.نظم العقد بين الطرفين </div>
            <div>
              الطرف الاول ( مؤجر ) / حيدر عناد حسين / مدير بلدية السماوة / وكالة{" "}
            </div>
            <div style={{ marginBottom: "40px" }}>
              الطرف الثاني السيد / {data?.client.name}
            </div>
            <div style={{ marginBottom: "10px" }}>
              : يتفق الطرفان على تنظيم عقد مساطحه بالشروط التالية
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١- يوافق الطرف الاول على ترتيب حق مساطحة للطرف الثاني مساطحة على
              القطعة المرقمة ( {data?.building.pieceNumber}) والبالغ مساحته ({" "}
              {englishToArabicDigits(data?.building.area, 0)} ) والمدونـة في
              سجـل الأملاك الاساسي لمدة ( {data?.period}) أعتبــار من{" "}
              {englishToArabicDigits(data?.from.slice(0, 10), 1)} لغايــة{" "}
              {englishToArabicDigits(data?.to.slice(0, 10), 1)} ببدل ايجار قدره
              رقما ( {englishToArabicDigits(data?.price, 0)}) و كتابتا ({" "}
              {tafqeet(data?.price)} ) وذلك لغرض اتخاذه( {data?.purpose} )على أن
              ينفذ الكشف الفني والبالغ ({" "}
              {englishToArabicDigits(data?.amount, 0)}) فقط ({" "}
              {tafqeet(data?.amount)}) على ان يعاد التقدير و التثمين كل خمس
              سنوات
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٢- يتعهد الطرف الثاني بأنشاء وأقامة البناء المذكور أعلاه خلال مدة
              لاتتجاوز (۷۰۰ يوم) وفق التصاميم الجديدة المعدة من قبل البلدية
              والذي تم موافقته علية قبل المباشرة بالبناء وبعكسه ينسخ العقد دون
              الحاجة الى انذار او استحقاق لأي تخصيص وتعبير كافة المشيدات عقار
              بالتخصيص تعود ملكيتها للبلدية ولمديرتنا المطالبة باجر المثل الارض
              وفوات المنفعة عن المدة التي لم يشيد بها المشروع
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٣- تبدءا مدة العقد أعتبارا من تاريخ توقيع عقد الايجار ويستحق بدل
              الايجار من تاريخ الاحاله وفي حالة تأخيره دفع القسط المستحق لمدة
              ثلاثة أشهر من تاريخ استحقاقه للطرف الاول حق فسخ العقد دون الحاجة
              إلى أنذار وتؤول - كافة الأبنية والمشيدات الى البلدية باعتبارها
              عقارا بالتخصيص
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٤- ليس للطرف الثاني أن يتصرف بحق المسلطحة بالبيع أو التنازل عنه أو
              الايجار الجزئي أو الكلي أو التنازل عن منفعته أو ترتيب حق عيني علية
              للغير وسواها من عقود التمليك ألا بموافقة الطرف التحريرية وفي حالة
              الاخلال بهذا الشرط يقوم الطرف الأول بالكشف والمعاينة وتثبيت
              الأخلال وغلق المشروع كاجراء أولي ويفسخ العقد دون الحاجة الى أنذار
              وتؤول مافة المشيدات الى البلدية
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٥- يلزم الطرف الثاني بعدم استعمال الارض لغير الغرض الوارد في العقد
              أو تعمد الاضرار بالمنشأت وبعكسه يفسخ العقد دون تعويض
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٦- يتحقق على الطرف الثاني (المستأجر) تسديد بدل الأجر المثل عن
              الارض والمنشأت دون الحاجة الى الانذاره عند تأخيره عن تسليم الارض
              والبناء والمنشأت الاخرى الى البلدية بعد أنتهاء مدة العقد وفي حالة
              عدم التسليم فالمؤجرور تقدیر بدل ايجار يساوي أجر المثل ويتم تقديرة
              عن طريق اللجنة المشكلة وفق أحكام القانون رقم ٢١ / لسنة (٢٠١٣)
              المعدل
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٧- تنتقل ملكية البناء والمنششأت الاخرى عند أنتهاء حق المساطحة الى
              البلدية وبحال جيدة وصالحة الاستعمال بعد أنتهاء مدة العقد وبدون عوض
              بأعتباره عقارا بالتخصيص وبدون نقص في التجهيزات الماء والكهرباء
              والمواد الاخرى ويتحمل كافة الاضرار الحاصلة في بالمنشأ
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٨- يسجل حق المساطحة في الدوائر التسجيل العقاري المختصة ويتحمل
              الطرف الثاني كافة الرسوم والاجور والضرائب وينتقل هذا الحق أرثا
              وفقا للقانون
            </div>
            <div style={{ marginBottom: "15px" }}>
              ٩- يحق للطرف الاول انتداب أحد منتسبيه لأجراء التفتيش في أي وقت
              للتأكد من صيانة وأدامة البناء حفظا لحقوقه
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٠- يحق للطرف الاول الحق بفسخ العقد فيما اذا ثبت أن الطرف الثاني
              قد أخل بشرط من الشروط المذكور أعلاه وتنقل ملكية البناء المشيدات
              الاخرى الى البلدية بدون عوض باعتبارها عقارا بالتخصيص
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١١- يتعهد الطرف الثاني بالمحافظة على البناء والمنشأت الاخرى من
              الاضرار خلال مدة العقد ولغاية انتهاء وتسليمه الى الطرف الاول دون
              اي نقص فيه
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٢- للبلدية حق في فسخ العقد دون حاجة الى اللجوء القضاء والمحاكم في
              حالة الأخلال بأي شرط أو اكثر من الشروط الواردة في العقد
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٣- لا تعاد الأمانات للمستأجر ألا في حالة تنفيذ المساطح كافة
              الالتزامات واكمال التشييد بنسبة %100
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٤- على المستأجر تعين مكتب استشاري من قبله للتعامل مع الحالات
              الفنية التي تحتاج ألى رأي ومعالجة من قبله عن التنفيذ
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٥- على المستأجر تسمية مهندس مدني من قبله الأشراف على تنفيذ
              المخططات وجدول الكميات الخاصة بالعمل عند التنفيذ ويخول المتابعة مع
              لجنة الأشراف التي تشكلها البلدية{" "}
            </div>
            <div style={{ marginBottom: "15px" }}>
              ١٦- تكون المواد المستخدمة في التشييد ذات جودة ومواصفات عالية تخضع
              للفحوصات المختبرية وحسب طبيعة المادة والفقرة ويكون اختياره من قبل
              لجنة الأشراف
            </div>
          </div>

          <div className={style.qr}>
            <QRCode
              value={`http://${window.location.hostname}/flat/${id}`}
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
              <div> الاســــــــــــــــم / حيدر عناد حسين</div>
              <div> العنوان : السماوة -حي النفط</div>
              <div>الهاتف : ۰۷۸۳۱۰۳۳۲۹۹</div>
              <div style={{ marginTop: "30px" }}>
                الــــــــــــــــــــــــواردات
              </div>
            </div>
          </div>
          <div
            className={style.left}
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "800",
              width: "100%",
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
