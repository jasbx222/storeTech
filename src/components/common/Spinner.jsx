import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/icons/header-logo.png';  
import './Spinner.css';

const Spinner = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const location = useLocation();  

  useEffect(() => {
   
    document.body.classList.add('no-scroll');

 
    setShowSpinner(true);

    const timer = setTimeout(() => {
      setShowSpinner(false);
      document.body.classList.remove('no-scroll');  
    }, 1000); 

    
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('no-scroll');  
    };
  }, [location.pathname]); 

  
  if (!showSpinner) return null;  

  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <img src={logo} alt="Logo" className="logo-spinner" />
      </div>
    </div>
  );
};

export default Spinner;
