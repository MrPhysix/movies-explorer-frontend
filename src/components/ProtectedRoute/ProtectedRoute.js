import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLogged, children }) {
  return isLogged
    ? children
    : <Navigate to="/" replace />;
}

export default ProtectedRoute;