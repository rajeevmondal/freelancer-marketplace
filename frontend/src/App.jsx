import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";

function AppContent() {
    const location = useLocation();

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/";

    return (
        <>
            {!hideNavbar && <Navbar />}

            <Routes>

                {/* PUBLIC ROUTES */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* CLIENT DASHBOARD */}

                <Route
                    path="/client-dashboard"
                    element={
                        <ProtectedRoute allowedRole="Client">
                            <ClientDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* FREELANCER DASHBOARD */}

                <Route
                    path="/freelancer-dashboard"
                    element={
                        <ProtectedRoute allowedRole="Freelancer">
                            <FreelancerDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* PROFILE */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* MY APPLICATIONS */}

                <Route
                    path="/my-applications"
                    element={
                        <ProtectedRoute allowedRole="Freelancer">
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;