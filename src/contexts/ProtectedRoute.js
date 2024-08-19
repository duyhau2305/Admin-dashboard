import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode }from 'jwt-decode';  // Sửa lại import để sử dụng hàm mặc định

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  let userRole;
  try {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken?.user?.role;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
