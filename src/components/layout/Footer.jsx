import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import useSocial from "../../hooks/useSocial";
import logo from '../../assets/icons/header-logo.png';
const Footer = () => {
  const { SocialData, loading, error } = useSocial();

  return (
    <footer className="footer">
      <div className="container">
        <div className="top-footer-bar row justify-content-between align-items-center mb-4 mt-4 pt-4 pb-4">
          <div className="col-md-4">
        
            
            <p className="footer-description">
              <img src={logo} alt=" Store" />
              
            </p>
            <div className="social-icons">
  {loading ? (
    // Skeleton loading placeholder
    <div className="skeleton-icons">
      <div className="skeleton-icon"></div>
      <div className="skeleton-icon"></div>
      <div className="skeleton-icon"></div>
      <div className="skeleton-icon"></div>
    </div>
  ) : (
    SocialData.map((social, index) => (
      <a
        key={index}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`icon ${social.platform.toLowerCase()}`}
      >
        <img src={social.icon} alt={social.platform} />
      </a>
    ))
  )}
</div>

          </div>
          <div className="col-md-3">
            <h4>عن ستور تك</h4>
            <p className="contact-button col-md-2">أريكة توفرلك أقصى درجات الراحة والتميز بكل زاوية من بيتك.</p>
            <p className="contact-button col-md-2">عنواننا: بغداد- المنصور - العمارة الركن المجاورة لبرج بغداد - الطابق الثالث</p>
            <a href="mailto:support@ariika.co" className="contact-button col-md-2">support@ariika.co</a>
          </div>
          <div className="col-md-2">
            <h4>خدمات</h4>
            <Link to='/terms' className="contact-button col-md-2">الشروط والأحكام </Link>
          </div>
        </div>

       

        <p className="copyright" dir="ltr">
          All Rights Reserved Sadaf Group l 2025 l Design And Development
          <a
            style={{ color: 'rgba(0, 12, 142, 1)', fontWeight: 'bold', textDecoration: 'underline !important',marginLeft:'5px' }}
            href='https://www.bandtech.co/'
            target="_blank"
            rel="noopener noreferrer"
          >
            BandTech
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
