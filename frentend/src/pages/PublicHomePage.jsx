import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, text }) => (
    <div className="p-6 bg-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{text}</p>
    </div>
);

const PublicHomePage = () => {
    return (
        <div className="text-gray-800">
            {/* Hero Section */}
            <section className="text-center py-20 bg-gradient-to-r from-green-50 to-blue-50">
                <h1 className="text-5xl font-extrabold mb-4">Stop Wondering What's for Dinner</h1>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                    Culinary Compass helps you discover new recipes, plan your weekly meals effortlessly, and generate a shopping list in seconds.
                </p>
                <Link to="/register" className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-colors duration-300">
                    Get Started for Free
                </Link>

            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Stress-Free Meals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard
                            icon="🔍"
                            title="Discover Recipes"
                            text="Search a massive database of recipes. Filter by ingredients, cuisine, or dietary needs to find your next favorite dish."
                        />
                        <FeatureCard
                            icon="📅"
                            title="Plan Your Week"
                            text="Organize your meals with our intuitive drag-and-drop calendar. Say goodbye to last-minute meal decisions."
                        />
                        <FeatureCard
                            icon="🛒"
                            title="Shop Smarter"
                            text="Automatically generate a consolidated shopping list from your meal plan. Save time and reduce food waste."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">How It Works in 3 Simple Steps</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">1</div>
                            <h3 className="text-xl font-bold">Find & Save</h3>
                            <p>Search for recipes you love and save them to your personal collection.</p>
                        </div>
                        <div className="text-2xl text-gray-300 hidden md:block">&rarr;</div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">2</div>
                            <h3 className="text-xl font-bold">Plan Your Meals</h3>
                            <p>Add your saved recipes to the weekly planner for breakfast, lunch, and dinner.</p>
                        </div>
                        <div className="text-2xl text-gray-300 hidden md:block">&rarr;</div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">3</div>
                            <h3 className="text-xl font-bold">Generate Your List</h3>
                            <p>Get a complete, organized shopping list for your entire week in a single click.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Meal Planning?</h2>
                <p className="text-lg text-gray-600 mb-8">Sign up today and take the stress out of cooking.</p>
                <Link to="/register" className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-colors duration-300">
                    Join Culinary Compass Now
                </Link>
            </section>
        </div>
    );
};

export default PublicHomePage;