import React from "react";
import './Ad.css';
import img from "../../assets/department/product3.png"
const Ads = () => {
  return (
    <div className="container">
    <div className="ad-container">
      
      <div className="ad-text-container">
        <h2 className="ad-title">2PCS KANGAROO POCKET THERMAL HOODIE</h2>
        <p className="ad-description">2pcs Kangaroo</p>
        <p className="ad-offer">
          احصل على رصيد استبدال يصل إلى 1000 دولار من شركات النقل
          المشاركة. تطبق الشروط.
        </p>
      </div>
      <div className="ad-image-container">
        <img src={img} alt="Kangaroo Hoodie" className="ad-image" />
      </div>
    </div>
    </div>
  );
};

export default Ads;
