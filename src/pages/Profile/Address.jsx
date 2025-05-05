"use client"

import { useState } from "react"
import "./Profile.css"

const Address = () => {
  const [formData, setFormData] = useState({
    governorate: "",
    area: "",
    recipientName: "",
    detailedAddress: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      governorate: "",
      area: "",
      recipientName: "",
      detailedAddress: "",
    })
  }

  return (
    <div className="address-container">
      

      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="governorate">المحافظة</label>
            <select
              id="governorate"
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              className="form-control"
            >
              <option value="" disabled>
                اختر المحافظة
              </option>
              <option value="cairo">القاهرة</option>
              <option value="alexandria">الإسكندرية</option>
              <option value="giza">الجيزة</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="area">المنطقة</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="form-control"
              placeholder="المنطقة"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="recipientName">اسم المستلم (اختياري)</label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              className="form-control"
              placeholder="اسم المستلم"
            />
          </div>

          <div className="form-group">
            <label htmlFor="detailedAddress">العنوان التفصيلي (GPS)</label>
            <input
              type="text"
              id="detailedAddress"
              name="detailedAddress"
              value={formData.detailedAddress}
              onChange={handleChange}
              className="form-control"
              placeholder="العنوان التفصيلي (GPS)"
            />
          </div>
        </div>

        <div className="form-row full-width">
          <div className="form-group">
            <label htmlFor="fullDetailedAddress">العنوان التفصيلي (GPS)</label>
            <input
              type="text"
              id="fullDetailedAddress"
              name="fullDetailedAddress"
              className="form-control"
              placeholder="العنوان التفصيلي (GPS)"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn btn-cancel">
            إلغاء
          </button>
          <button type="submit" className="btn btn-save">
            حفظ
          </button>
        </div>
      </form>
    </div>
  )
}

export default Address

