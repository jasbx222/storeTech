import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';  // Importing a suitable icon
import './Error.css';  // Assuming you have the necessary styles

const ErrorPage = () => {
  return (
    <div className="container">
      <div className="error-container">
        {/* Error Icon */}
        <FaExclamationTriangle className="error-icon" />
        
        <h1 className="error-title">Something Went Wrong!</h1>
        
        {/* Back to Home button */}
        <Link to="/" className="back-home-button">Back to Home</Link> 
      </div>
    </div>
  );
};

export default ErrorPage;
