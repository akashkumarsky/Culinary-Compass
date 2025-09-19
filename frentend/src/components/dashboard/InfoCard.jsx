import React from "react";
import { Link } from "react-router-dom";

const InfoCard = ({ title, description, icon, linkTo }) => {
    return (
        <Link
            to={linkTo}
            aria-label={title}
            className="block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md 
                 hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300"
        >
            <div className="flex items-center mb-3">
                <span className="text-3xl mr-4 transition-transform duration-300 group-hover:rotate-12">
                    {icon}
                </span>
                <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {title}
                </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {description}
            </p>
        </Link>
    );
};

export default InfoCard;
