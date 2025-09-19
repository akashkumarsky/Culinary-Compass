import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoCard from "../components/dashboard/InfoCard";

const DashboardPage = () => {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // ✅ Load API base URL from .env
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                // ✅ Use env variable instead of hardcoded localhost
                await axios.get(`${API_BASE_URL}/api/dashboard/welcome`);

                const messages = [
                    "Your culinary journey starts here. Let’s turn ingredients into memories.",
                    "Cooking made simple, planning made smart — welcome back, Chef!",
                    "Good food, good mood. Let’s create something delicious today.",
                    "Every recipe is a story, and yours starts now.",
                    "Fuel your body. Delight your soul. Plan, cook, and enjoy!",
                    "Welcome to Culinary Compass 🧭 — where flavors guide your day.",
                    "From kitchen chaos to meal mastery — we’ve got you covered.",
                    "Discover. Plan. Cook. Repeat. Your taste adventure awaits.",
                    "Meals don’t just feed the body — they bring people together.",
                    "Smart planning, tasty living. Let’s get cooking!"
                ];

                setWelcomeMessage(messages[Math.floor(Math.random() * messages.length)]);
            } catch (error) {
                console.error("Failed to fetch welcome message", error);
                setWelcomeMessage("Welcome back to your dashboard, Chef!");
            } finally {
                setLoading(false);
            }
        };
        fetchWelcomeMessage();
    }, [API_BASE_URL]);

    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning 🌞";
        if (hour < 18) return "Good Afternoon 🌤️";
        return "Good Evening 🌙";
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center p-4 md:p-6 pb-16">
            {/* Hero Section */}
            <div className="w-full max-w-5xl text-center p-8 md:p-10 mb-30 bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 rounded-3xl shadow-2xl mx-2 md:mx-0 ">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                    {loading ? "Loading..." : welcomeMessage}
                </h1>
                <p className="text-md md:text-lg font-medium text-green-100">
                    {getTimeGreeting()} in Bengaluru 👋. What delicious meal are you planning next?
                </p>
            </div>

            {/* Interactive Cards */}
            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 px-2 md:px-0 pb-5">
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
