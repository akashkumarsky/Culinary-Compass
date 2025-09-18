import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white mt-auto p-8">
            <div className="container mx-auto text-center">
                <h3 className="text-2xl font-bold text-green-400 mb-2">Culinary Compass 🧭</h3>
                <p className="text-gray-400 mb-4">Your guide to delicious, planned meals.</p>

                <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" className="hover:text-green-400 transition-colors">About</a>
                    <a href="#" className="hover:text-green-400 transition-colors">Contact</a>
                    <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
                </div>

                <p className="text-sm text-gray-500">
                    &copy; {currentYear} Culinary Compass. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;