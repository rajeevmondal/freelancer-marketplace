import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div
                className="navbar-logo"
                onClick={() => {
                    if (user?.role === "Client") {
                        navigate("/client-dashboard");
                    } else {
                        navigate("/freelancer-dashboard");
                    }
                }}
            >
                Freelancer Marketplace
            </div>

            <div className="navbar-links">
                <button
                    onClick={() => {
                        if (user?.role === "Client") {
                            navigate("/client-dashboard");
                        } else {
                            navigate("/freelancer-dashboard");
                        }
                    }}
                >
                    Dashboard
                </button>

                {user?.role === "Freelancer" && (
                    <button
                        onClick={() =>
                            navigate("/my-applications")
                        }
                    >
                        My Applications
                    </button>
                )}

                <button
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </button>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;