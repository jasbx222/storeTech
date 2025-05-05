import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import OrderDetails from './OrderDetails';
import ProfileData from './Profiledata';
import Address from './Address';
import HeadTitle from '../HeadTitle/HeadTitle';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  
  useEffect(() => {
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo === 'true') {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('name')); 
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  // Content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="tab-content col-md-9">
            <h3>معلوماتي</h3>
            <p>تفاصيل الحساب</p>
            <ProfileData/>
          </div>
        );
      case 'orders':
        return (
          <div className="tab-content col-md-9">
            <h3>طلباتي</h3>
        
            <OrderDetails/>
          </div>
        );
      case 'address':
        return (
          <div className="tab-content col-md-9">
            <h3>العنوان</h3>
           <p>تفاصيل العنوان</p>
            <Address/>
          </div>
        );
      case 'settings':
        return (
          <div className="tab-content col-md-8">
            <OrderDetails />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
   <HeadTitle title="البروفايل" />
    <div className="container">
      <div className="profile-container row align-items-start justify-between">
        {/* Profile Tabs */}
        <div className="tabs col-md-3">
          {isLoggedIn ? (
            <h4 className="user-name">مرحبا، {userName}</h4>
          ) : (
            <h4 className="user-name">مرحبا,</h4>
          )}

          <h4 className='login-message'>مرحباً بكم في حسابك</h4>

          <button
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingCart className="tab-icon" /> طلباتي
          </button>

          {/* <button
            className={`tab ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => setActiveTab('address')}
          >
            <FaMapMarkerAlt className="tab-icon" /> العنوان
          </button> */}

          <button
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            <FaUser className="tab-icon" /> معلوماتي
          </button>

          <button
            className="tab logout"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <FaSignOutAlt className="tab-icon" /> تسجيل الخروج
          </button>
        </div>

       
        {renderContent()}
      </div>
    </div>
    </>
  );
};

export default ProfilePage;

