import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react'; // modern icons

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black backdrop-blur-md shadow-lg sticky top-0 z-50">

            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <Link
                    to={token ? '/dashboard' : '/'}
                    className="text-2xl font-extrabold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent drop-shadow"
                >
                    Culinary Compass 🧭
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {token ? (
                        <>
                            <Link className="relative text-white font-medium hover:text-green-300 transition" to="/dashboard">
                                Dashboard
                            </Link>
                            <Link className="relative text-white font-medium hover:text-green-300 transition" to="/search">
                                Search
                            </Link>
                            <Link className="relative text-white font-medium hover:text-green-300 transition" to="/my-recipes">
                                My Recipes
                            </Link>
                            <Link className="relative text-white font-medium hover:text-green-300 transition" to="/planner">
                                Planner
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-2 px-5 rounded-full hover:scale-105 transform transition-all shadow-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="relative text-white font-medium hover:text-green-300 transition" to="/login">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-5 rounded-full hover:scale-105 transform transition-all shadow-md"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 bg-white/10 backdrop-blur-lg border-t border-white/20">
                    {token ? (
                        <>
                            <Link to="/dashboard" className="block text-white hover:text-green-300">Dashboard</Link>
                            <Link to="/search" className="block text-white hover:text-green-300">Search</Link>
                            <Link to="/my-recipes" className="block text-white hover:text-green-300">My Recipes</Link>
                            <Link to="/planner" className="block text-white hover:text-green-300">Planner</Link>
                            <button
                                onClick={logout}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-2 rounded-full hover:scale-105 transform transition-all shadow-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-white hover:text-green-300">Login</Link>
                            <Link
                                to="/register"
                                className="block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-5 rounded-full hover:scale-105 transform transition-all shadow-md"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
