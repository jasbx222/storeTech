import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ message: 'من فضلك قم بتسجيل الدخول اولا' }} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
