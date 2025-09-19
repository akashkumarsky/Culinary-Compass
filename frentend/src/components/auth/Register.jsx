import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // <-- 1. Import useNavigate

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // <-- 2. Initialize the hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088';
            const response = await axios.post(
                `${API_URL}/api/users/register`,
                formData
            );
            console.log('User registered successfully:', response.data);

            // 3. Redirect to the login page on success
            navigate('/login');

        } catch (err) {
            console.error('Error registering user:', err.response?.data);
            setError(err.response?.data || 'Something went wrong!');
        }
    };

    return (
        // --- Your beautiful JSX remains exactly the same ---
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-teal-800 to-blue-900 p-6">
            <div className="w-full max-w-md bg-gray-900/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-800 animate-fadeIn">
                <h2 className="text-3xl font-extrabold text-center text-white drop-shadow mb-4">
                    Create Account ✨
                </h2>
                <p className="text-center text-gray-300 text-sm mb-6">
                    Join now and start your culinary journey
                </p>

                {error && (
                    <div className="mb-4 text-center text-red-400 text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ... Your form inputs ... */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2" htmlFor="username">Username</label>
                        <input className="w-full px-4 py-3 rounded-xl bg-gray-800/40 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition" id="username" type="text" name="username" placeholder="Enter your username" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-4 py-3 rounded-xl bg-gray-800/40 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition" id="email" type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2" htmlFor="password">Password</label>
                        <input className="w-full px-4 py-3 rounded-xl bg-gray-800/40 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition" id="password" type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-green-700 via-teal-700 to-blue-800 hover:scale-105 transform transition-all shadow-lg">
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-green-300 hover:text-green-400 transition">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;