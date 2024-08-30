import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import LoadingPage from "@components/Layout/LoadingPage";

interface ProtectedRouteProps {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingPage />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;