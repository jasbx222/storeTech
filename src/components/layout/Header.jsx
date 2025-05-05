
// // export default Header;
// import React, { useEffect, useRef,useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaBell, FaRegHeart, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
// import './Header.css';
// import logo from '../../assets/icons/header-logo.png';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { Button } from "@mui/material";
// import ForgotPasswordModal from '../../pages/auth/ForgotPasswordModel';
// import AuthModal from '../../pages/auth/AuthModal';
// import useHeaderSearch from '../../hooks/useHeaderSearch';
// import { NavLink } from 'react-router-dom';
// import PersistentDrawerLeft from './Search';
// import Sidebar from './Search';
// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const [userName, setUserName] = React.useState('');
//   const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
//   const [openAuth, setOpenAuth] = React.useState(false);
//   const [openForgotPassword, setOpenForgotPassword] = React.useState(false);
//   const [cartCount, setCartCount] = React.useState(0);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const handleNotificationsToggle = () => {
//     setIsNotificationsOpen(!isNotificationsOpen); // Toggle notifications dropdown
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Implement login logic
//   };
//   // Dummy notifications for now
//   const notifications = [
//     { id: 1, text: "لم يتم إنشاء الحساب بنجاح", time: "منذ 20 دقيقة" },
//     { id: 2, text: "تم تغيير كلمة المرور بنجاح", time: "منذ 5 ساعات" },
//     { id: 3, text: "تم وصول الطلب", time: "منذ يومين" },
//   ];

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   const {
//     query,
//     setQuery,
//     results: searchResults,
//     loading: loadingSearch,
//     showDropdown: showSearchDropdown,
//     setShowDropdown: setShowSearchDropdown
//   } = useHeaderSearch();

//   const dropdownRef = useRef();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loginInfo = localStorage.getItem('loginInfo');
//     if (loginInfo === 'true') {
//       setIsLoggedIn(true);
//       setUserName(localStorage.getItem('name'));
//     }

//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartCount(totalItems);
//     };

//     updateCartCount();
//     window.addEventListener("cartUpdated", updateCartCount);
//     return () => window.removeEventListener("cartUpdated", updateCartCount);
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowSearchDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, [setShowSearchDropdown]);

//   return (
//     <header>
//       <div className="container">
//         <div className="header-content">

//           <div className="logo-container">
//             <Link to="/"><img src={logo} alt="Store Tech App" className="logo-image" /></Link>
//           </div>

//           <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             <FaBars />
//           </div>

//           <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
//   <NavLink 
//     to="/" 
//     className="nav-link" 
//     onClick={() => setIsMenuOpen(false)} 
//     activeClassName="active-link" // Add active class
//   >
//     الرئيسية
//   </NavLink>
//   <NavLink 
//     to="/categories/1" 
//     className="nav-link" 
//     onClick={() => setIsMenuOpen(false)} 
//     activeClassName="active-link"
//   >
//     الأقسام
//   </NavLink>
//   <NavLink 
//     to="/products" 
//     className="nav-link" 
//     onClick={() => setIsMenuOpen(false)} 
//     activeClassName="active-link"
//   >
//     المنتجات
//   </NavLink>
//   {/* <NavLink 
//     to="/contact-us" 
//     className="nav-link" 
//     onClick={() => setIsMenuOpen(false)} 
//     activeClassName="active-link"
//   >
//     اتصل بنا
//   </NavLink> */}
//   <NavLink 
//     to="/terms" 
//     className="nav-link" 
//     onClick={() => setIsMenuOpen(false)} 
//     activeClassName="active-link"
//   >
//     الشروط والأحكام
//   </NavLink>
// </nav>


        
//           {/* 👤 User Actions */}
//           <div className="user-actions">
       

//             <AuthModal
//               open={openAuth}
//               handleClose={() => setOpenAuth(false)}
//               openForgotPassword={() => {
//                 setOpenAuth(false);
//                 setOpenForgotPassword(true);
//               }}
//             />

//             <ForgotPasswordModal
//               open={openForgotPassword}
//               handleClose={() => setOpenForgotPassword(false)}
//             />
            
//             {isLoggedIn ? (
//               <div className="user-info">
//                 <Link to='/profile' className='action-icon'>
//                   <FaUser />
//                   <span className="user-name">مرحبا، {userName}</span>
//                 </Link>
//               </div>
//             ) : (
//               <Button variant="contained" onClick={() => setOpenAuth(true)} style={{ background: 'rgba(27, 53, 94, 1)' }}>
//                 تسجيل الدخول
//               </Button>
//             )}
//  {/* Notification Icon with Dropdown */}
//  {isLoggedIn && (
// <div className="notification-container" onClick={handleNotificationsToggle}>
//    <b className="action-icon">
//  <FaBell />
//    </b>
//    {isNotificationsOpen && (
//  <div className="notifications-dropdown">
//    <ul>
//      {notifications.map((notification) => (
//         <li key={notification.id}>
//                            <span>{notification.text}</span>
//                         <div className="not-text">
                        
//                        <span className="close-notification">×</span>
//                         <span className="notification-time">{notification.time}</span>
//                          </div>
//                       </li>
//                     ))}
//                   </ul>
//                  </div>
//               )}
//                </div>
//             )}
//               {/* 🔍 Search */}
//               <button onClick={toggleSidebar} className='search-icon'><FaSearch /></button>
            
           

//             <span
//   className="action-icon with-bord"
//   onClick={() => {
//     if (!isLoggedIn) {
//       toast.warning("يرجى تسجيل الدخول أولاً");
//     } else {
//       navigate("/favorites");
//     }
//   }}
// >
//   <FaRegHeart />
// </span>

// <span
//   className="action-icon with-bord cart-icon"
//   onClick={() => {
//     if (!isLoggedIn) {
//       toast.warning("يرجى تسجيل الدخول أولاً");
//     } else {
//       navigate("/cart");
//     }
//   }}
// >
//   <FaShoppingCart />
//   {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
// </span>

// <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />




//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaRegHeart, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import './Header.css';
import logo from '../../assets/icons/header-logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@mui/material";
import ForgotPasswordModal from '../../pages/auth/ForgotPasswordModel';
import AuthModal from '../../pages/auth/AuthModal';
import useHeaderSearch from '../../hooks/useHeaderSearch';
import { NavLink } from 'react-router-dom';
import PersistentDrawerLeft from './Search';
import Sidebar from './Search';
import RegisterModel from '../../pages/auth/RegisterModel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [openAuth, setOpenAuth] = React.useState(false);
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);  // Added state for Register Modal

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen); // Toggle notifications dropdown
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

  // Dummy notifications for now
  const notifications = [
    { id: 1, text: "لم يتم إنشاء الحساب بنجاح", time: "منذ 20 دقيقة" },
    { id: 2, text: "تم تغيير كلمة المرور بنجاح", time: "منذ 5 ساعات" },
    { id: 3, text: "تم وصول الطلب", time: "منذ يومين" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const {
    query,
    setQuery,
    results: searchResults,
    loading: loadingSearch,
    showDropdown: showSearchDropdown,
    setShowDropdown: setShowSearchDropdown
  } = useHeaderSearch();

  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo === 'true') {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('name'));
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setShowSearchDropdown]);

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            <Link to="/"><img src={logo} alt="Store Tech App" className="logo-image" /></Link>
          </div>

          <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars />
          </div>

          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)} activeClassName="active-link">
              الرئيسية
            </NavLink>
            <NavLink to="/categories/1" className="nav-link" onClick={() => setIsMenuOpen(false)} activeClassName="active-link">
              الأقسام
            </NavLink>
            <NavLink to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)} activeClassName="active-link">
              المنتجات
            </NavLink>
            <NavLink to="/terms" className="nav-link" onClick={() => setIsMenuOpen(false)} activeClassName="active-link">
              الشروط والأحكام
            </NavLink>
          </nav>

          {/* 👤 User Actions */}
          <div className="user-actions">
            <AuthModal
              open={openAuth}
              handleClose={() => setOpenAuth(false)}
              openForgotPassword={() => {
                setOpenAuth(false);
                setOpenForgotPassword(true);
              }}
            />
            <RegisterModel open={openRegister} handleClose={() => setOpenRegister(false)} openForgotPassword={() => setOpenForgotPassword(true)} /> {/* Register Modal */}

            <ForgotPasswordModal
              open={openForgotPassword}
              handleClose={() => setOpenForgotPassword(false)}
            />

            {isLoggedIn ? (
              <div className="user-info">
                <Link to='/profile' className='action-icon'>
                  <FaUser />
                  <span className="user-name">مرحبا، {userName}</span>
                </Link>
              </div>
            ) : (
              <>
               <Button variant="" onClick={() => setOpenAuth(true)} style={{ border: '1px solid rgba(27, 53, 94, 1)',color: 'rgba(27, 53, 94, 1)', background: 'transparent' }}>
                  تسجيل الدخول
                </Button>
                <Button variant="" onClick={() => setOpenRegister(true)} style={{ background: 'rgba(27, 53, 94, 1)',border: '1px solid transparent',color:'#fff' }}>
                  إنشاء حساب
                </Button>
               
              </>
            )}

            {/* Notification Icon with Dropdown */}
            {isLoggedIn && (
              <div className="notification-container" onClick={handleNotificationsToggle}>
                <b className="action-icon">
                  <FaBell />
                </b>
                {isNotificationsOpen && (
                  <div className="notifications-dropdown">
                    <ul>
                      {notifications.map((notification) => (
                        <li key={notification.id}>
                          <span>{notification.text}</span>
                          <div className="not-text">
                            <span className="close-notification">×</span>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 🔍 Search */}
            <button onClick={toggleSidebar} className='search-icon'><FaSearch /></button>

            <span
              className="action-icon with-bord"
              onClick={() => {
                if (!isLoggedIn) {
                  toast.warning("يرجى تسجيل الدخول أولاً");
                } else {
                  navigate("/favorites");
                }
              }}
            >
              <FaRegHeart />
            </span>

            <span
              className="action-icon with-bord cart-icon"
              onClick={() => {
                if (!isLoggedIn) {
                  toast.warning("يرجى تسجيل الدخول أولاً");
                } else {
                  navigate("/cart");
                }
              }}
            >
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </span>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
