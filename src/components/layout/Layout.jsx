import React from 'react';
import { Link, useLocation } from 'react-router-dom';  
import Header from './Header';
import './Layout.css';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();  

  
  const isErrorRoute = location.pathname === '/error';

  return (
    <div className="layout">
     
      {!isErrorRoute && <Header />} 
      
      
      <main className="main-content">
        {children}
      </main>
      
      {!isErrorRoute && <Footer />} 
    </div>
  );
};

export default Layout;
