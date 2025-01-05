import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role, isAuthenticated }) => {
  const storedRole = localStorage.getItem('role');

  // Check if the user is authenticated and has the correct role
  if (!isAuthenticated || storedRole !== role) {
    return <Navigate to="/login" />;
  }

  return children; // If the user is authorized, render the child component
};

export default ProtectedRoute;
