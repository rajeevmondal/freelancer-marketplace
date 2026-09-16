import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Freelancer");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await API.post("/auth/register", {
                name,
                email,
                password,
                role
            });

            console.log("REGISTER SUCCESS:", response.data);

            setMessage(
                response.data.message || "Registration successful"
            );

            // Go to login after successful registration
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.log("REGISTER ERROR:", error);

            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Freelancer Marketplace</h1>

                <h2>Create Account</h2>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Account Type</label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        >

                            <option value="Freelancer">
                                Freelancer
                            </option>

                            <option value="Client">
                                Client
                            </option>

                        </select>

                    </div>

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p className="auth-link">

                    Already have an account?{" "}

                    <span
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Register;