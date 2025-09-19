import React from 'react';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'; // modern icons

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white mt-auto py-10">
            <div className="container mx-auto text-center px-6">
                {/* Brand */}
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow mb-3">
                    Culinary Compass 🧭
                </h3>
                <p className="text-gray-400 max-w-lg mx-auto mb-6">
                    Your guide to delicious, planned meals. Crafted with love for foodies around the world.
                </p>

                {/* Links */}
                <div className="flex justify-center space-x-8 mb-6">
                    <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About</a>
                    <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a>
                    <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Privacy Policy</a>
                </div>

                {/* Socials */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="#" className="text-gray-400 hover:text-green-400 transition">
                        <Facebook size={22} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-green-400 transition">
                        <Twitter size={22} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-green-400 transition">
                        <Instagram size={22} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-green-400 transition">
                        <Github size={22} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-500">
                    &copy; {currentYear} <span className="font-semibold text-green-400">Culinary Compass</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
