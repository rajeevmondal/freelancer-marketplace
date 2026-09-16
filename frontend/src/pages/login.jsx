import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        const result = await login(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        // Redirect based on role
        if (result.user.role === "Client") {
            navigate("/client-dashboard");
        } else {
            navigate("/freelancer-dashboard");
        }
    };


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Freelancer Marketplace</h1>

                <h2>Login</h2>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>


                    <button type="submit">
                        Login
                    </button>

                </form>


                <p className="auth-link">
                    Don't have an account?{" "}

                    <span onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;