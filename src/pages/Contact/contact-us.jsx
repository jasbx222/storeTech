"use client"
import "./contact-us.css"
import { useState, useEffect } from "react";
import useContactInfo from "../../hooks/useContact";  
import phone from "../../assets/icons/contact-1.png"
import email from "../../assets/icons/contact-2.png"
import web from "../../assets/icons/contact-3.png"
import location from "../../assets/icons/contact-4.png"
import HeadTitle from "../HeadTitle/HeadTitle";
const ContactUs = () => {
  const { InfoData, loading, error } = useContactInfo(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form submitted");
  }

  if (loading) {
    return <p>...</p>;  
  }

  if (error) {
    return <p></p>;  // Handle error state
  }

  return (
    <>
    <HeadTitle title="اتصل بنا" />
    <div className="container">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">اتصل بنا</h1>
          <p className="contact-subtitle">سنساعد على الاتصال معك لحل مشاكلك</p>
        </div>

        <div className="contact-content row justify-content-between">
          <div className="contact-info-section col-lg-4">
            <div className="info-content">
              <h2 className="info-title">معلومات الاتصال</h2>
              <p className="info-description">{InfoData?.support_message || "فريق الدعم سوف يقوم بالرد عليك خلال 24 ساعة"}</p>

              <div className="contact-details">
                <div className="contact-item">
                  <img src={phone} alt="Phone" />
                  <span>{InfoData?.phone || "+91 98765 43210"}</span>
                </div>

                <div className="contact-item">
                  <img src={email} alt="Email" />
                  <span>{InfoData?.email || "domain@paypal.com"}</span>
                </div>

                <div className="contact-item">
                  <img src={web} alt="Website" />
                  <span>{InfoData?.website || "https://paypal.com"}</span>
                </div>

                <div className="contact-item">
                  <img src={location} alt="Location" />
                  <span>{InfoData?.address || "25 شارع المدينة - الجيزة"}</span>
                </div>
              </div>
            </div>
            <div className="decorative-shape"></div>
          </div>

          <div className="contact-form-section col-lg-7">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-between">
                <div className="form-group w-md-50">
                  <label>الاسم الاول</label>
                  <input type="text" placeholder="الاسم الأول" required />
                </div>
                <div className="form-group w-md-50">
                  <label>اسم العائلة</label>
                  <input type="text" placeholder="اسم العائلة" required />
                </div>
              </div>

              <div className="row justify-content-between">
                <div className="form-group w-md-50 ">
                  <label> رقم الهاتف</label>
                  <input type="tel" placeholder="رقم الهاتف" required />
                </div>
                <div className="form-group w-md-50">
                  <label>البريد الإلكتروني</label>
                  <input type="email" placeholder="البريد الإلكتروني" required />
                </div>
              </div>

              <div className="form-group col-12">
                <label> رسالة </label>
                <textarea placeholder="اكتب رسالتك" rows={6} required></textarea>
              </div>

              <button type="submit" className="submit-button w-100">
                إرسال رسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ContactUs;
