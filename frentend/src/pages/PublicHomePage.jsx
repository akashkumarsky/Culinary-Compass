import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, text }) => (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{text}</p>
    </div>
);

const PublicHomePage = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-32 text-center">
                {/* Background decorative blobs */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[700px] h-[700px] bg-green-400/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-2xl animate-blob animation-delay-2000"></div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-green-100 to-white">
                        Stop Wondering What's for Dinner
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-10">
                        Culinary Compass helps you discover new recipes, plan your weekly meals effortlessly, and generate a shopping list in seconds.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-gradient-to-r from-green-500 via-teal-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transform transition-all shadow-xl hover:shadow-2xl"
                    >
                        Get Started for Free
                    </Link>
                </div>
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
            <section className="py-20 bg-gray-900/50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">How It Works in 3 Simple Steps</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-400 bg-green-800/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">1</div>
                            <h3 className="text-xl font-bold mb-2">Find & Save</h3>
                            <p>Search for recipes you love and save them to your personal collection.</p>
                        </div>
                        <div className="text-2xl text-gray-600 hidden md:block">&rarr;</div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-400 bg-green-800/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">2</div>
                            <h3 className="text-xl font-bold mb-2">Plan Your Meals</h3>
                            <p>Add your saved recipes to the weekly planner for breakfast, lunch, and dinner.</p>
                        </div>
                        <div className="text-2xl text-gray-600 hidden md:block">&rarr;</div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-400 bg-green-800/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">3</div>
                            <h3 className="text-xl font-bold mb-2">Generate Your List</h3>
                            <p>Get a complete, organized shopping list for your entire week in a single click.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Meal Planning?</h2>
                <p className="text-lg text-gray-300 mb-8">Sign up today and take the stress out of cooking.</p>
                <Link
                    to="/register"
                    className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-colors duration-300 shadow-lg"
                >
                    Join Culinary Compass Now
                </Link>
            </section>
        </div>
    );
};

export default PublicHomePage;
