import React from 'react';
import { Link } from 'react-router-dom';

const InfoCard = ({ title, description, icon, linkTo }) => {
    return (
        <Link to={linkTo} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-3">
                <span className="text-3xl mr-4">{icon}</span>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
            </div>
            <p className="font-normal text-gray-700">{description}</p>
        </Link>
    );
};

export default InfoCard;