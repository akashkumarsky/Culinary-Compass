import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // --- THIS IS THE FIX ---
            // 1. Define the API_URL constant first.
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088';
            
            // 2. Make the API call and assign its result to 'response'.
            const response = await axios.post(`${API_URL}/api/users/login`, formData);

            // 3. Use the token from the response to log in.
            login(response.data.token);
            
            // Note: The alert can be removed if you have automatic redirection in your App.jsx
            // alert("Login successful!"); 

        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-teal-800 to-blue-900 p-6">
            <div className="w-full max-w-md bg-gray-900/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-800 animate-fadeIn">
                <h2 className="text-3xl font-extrabold text-center text-white drop-shadow mb-2">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-gray-300 text-sm mb-6">
                    Sign in to continue your culinary journey
                </p>

                {error && (
                    <div className="mb-4 text-center text-red-400 text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/40 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/40 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-green-700 via-teal-700 to-blue-800 hover:scale-105 transform transition-all shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="font-bold text-green-300 hover:text-green-400 transition">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;