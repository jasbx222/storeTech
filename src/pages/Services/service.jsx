"use client"
import "./service.css"
import { Users, Star, Wallet } from "lucide-react"
import service1 from "../../assets/icons/service-1.png"
import service2 from "../../assets/icons/service-2.png"
import service3 from "../../assets/icons/service-3.png"
export default function Services() {
  return (
    <div className="services-container">
        <div className="container">
      <div className="services-grid">
      <div className="service-card">
          <div className="icon-wrapper">
           <img src={service1} alt="Service 1" className="service-icon" />
          </div>
          <h3 className="service-title">فلوسك بالمكان الصريح</h3>
          <p className="service-description">
            ضمان استرجاع أو استبدال المنتجات خلال أول 72 ساعة من الاستلام في حال ماعجبتها مريحة!
          </p>
        </div>
        <div className="service-card">
          <div className="icon-wrapper">
          <img src={service2} alt="Service 2" className="service-icon" />
          </div>
          <h3 className="service-title">هواية منتجات كلها مريحة</h3>
          <p className="service-description">
            بتريحك تاكل المنتج إلي بناسبك، من الأساسيات إلي بحتاجها للبيت إلى كل التفاصيل إلي بتكمل راحتك.
          </p>
        </div>

       

        <div className="service-card">
          <div className="icon-wrapper">
          <img src={service3} alt="Service 3" className="service-icon" />
          </div>
          <h3 className="service-title">بخدمة العملاء 24/7</h3>
          <p className="service-description">
            دائماً موجودين وبكثر تواصل وإلنا بخصوص أي استفسار عادي عن طريق حسابنا على فيسبوك، انستغرام أو الواتساب.
          </p>
        </div>

      </div>
      </div>
    </div>
  )
}
