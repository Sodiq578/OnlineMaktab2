// src/components/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('oquvmarkaz_admin') === 'true';
  
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export default AdminProtectedRoute;