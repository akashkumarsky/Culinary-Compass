import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    // State to hold the form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Function to update state when user types in an input field
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Make a POST request to the backend registration endpoint
            const response = await axios.post('http://localhost:8088/api/users/register', formData);
            console.log('User registered successfully:', response.data);
            alert('Registration successful!');
            // You can add logic here to redirect the user or clear the form
        } catch (error) {
            console.error('There was an error registering the user:', error.response.data);
            alert(`Error: ${error.response.data}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
             <p className="text-center text-gray-500 text-sm mt-6">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-blue-500 hover:text-blue-800">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;