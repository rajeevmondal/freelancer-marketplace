import React, { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );


    // LOGIN
    const login = async (email, password) => {
        try {

            const response = await API.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setToken(token);
            setUser(user);

            return {
                success: true,
                user
            };

        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed"
            };
        }
    };


    // LOGOUT
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


// Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};