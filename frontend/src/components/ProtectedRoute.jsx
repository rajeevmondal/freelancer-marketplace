import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
    const { user, token } = useAuth();

    // User login nahi hai
    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    // User ka role allowed nahi hai
    if (allowedRole && user.role !== allowedRole) {
        if (user.role === "Client") {
            return (
                <Navigate
                    to="/client-dashboard"
                    replace
                />
            );
        }

        if (user.role === "Freelancer") {
            return (
                <Navigate
                    to="/freelancer-dashboard"
                    replace
                />
            );
        }

        return <Navigate to="/login" replace />;
    }

    // Sab correct hai
    return children;
}

export default ProtectedRoute;