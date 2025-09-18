import React, { useState, useContext } from 'react'; // <-- Import useContext
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // <-- Import AuthContext
import { Link } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext); // <-- Use the context

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8088/api/users/login', formData);
            login(response.data.token); // <-- Call the login function from context
            alert('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="******************"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
            <p className="text-center text-gray-500 text-sm mt-6">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-blue-500 hover:text-blue-800">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Login;