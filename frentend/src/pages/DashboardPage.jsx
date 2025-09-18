import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoCard from '../components/dashboard/InfoCard';

const DashboardPage = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                const response = await axios.get('http://localhost:8088/api/dashboard/welcome');
                setWelcomeMessage(response.data);
            } catch (error) {
                console.error("Failed to fetch welcome message", error);
                setWelcomeMessage("Welcome to your dashboard!");
            }
        };
        fetchWelcomeMessage();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div className="text-center p-8 mb-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-white mb-2">{welcomeMessage}</h1>
                <p className="text-lg text-green-100">
                    It's Thursday afternoon here in Bengaluru. What delicious meal are you planning next?
                </p>
            </div>

            {/* Interactive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InfoCard
                    icon="🔍"
                    title="Find a Recipe"
                    description="Search thousands of recipes to find the perfect meal for any occasion."
                    linkTo="/search"
                />
                <InfoCard
                    icon="📚"
                    title="My Saved Recipes"
                    description="View, manage, and get inspired by your collection of saved recipes."
                    linkTo="/my-recipes"
                />
                <InfoCard
                    icon="📅"
                    title="Weekly Meal Planner"
                    description="Plan your meals for the week, remove stress, and generate a shopping list."
                    linkTo="/planner"
                />
            </div>
        </div>
    );
};

export default DashboardPage;