import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
};

const ProtectedRoute = (props: ProtectedRouteProps) => {

    const { children } = props;

    const token = localStorage.getItem('user-login');

    if (!token) {
        return <Navigate to={'/login'} replace />;
      }
    
      return children;
};

export default ProtectedRoute;