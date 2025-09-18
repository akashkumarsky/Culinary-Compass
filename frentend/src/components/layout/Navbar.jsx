import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* 1. Make the logo link dynamic */}
                <Link to={token ? "/dashboard" : "/"} className="text-2xl font-bold text-green-600">
                    Culinary Compass 🧭
                </Link>
                <div>
                    {token ? (
                        // 2. Cleaned-up links for logged-in users
                        <div className="flex items-center space-x-4">
                            <Link to="/dashboard" className="text-gray-600 hover:text-green-600 font-medium">Dashboard</Link>
                            <Link to="/search" className="text-gray-600 hover:text-green-600 font-medium">Search</Link>
                            <Link to="/my-recipes" className="text-gray-600 hover:text-green-600 font-medium">My Recipes</Link>
                            <Link to="/planner" className="text-gray-600 hover:text-green-600 font-medium">Planner</Link>
                            <button onClick={logout} className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-300">
                                Logout
                            </button>
                        </div>
                    ) : (
                        // 3. Improved links for logged-out users
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium">Login</Link>
                            <Link to="/register" className="bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition-colors duration-300">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;