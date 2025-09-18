import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/recipes/RecipeCard';
import RecipeCardSkeleton from '../components/recipes/RecipeCardSkeleton';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false); // To track if a search has been made

    const searchRecipes = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setSearched(true);
        try {
            const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
            // Add 'addRecipeInformation=true' to get more details like servings and time
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=12&apiKey=${apiKey}`);
            setRecipes(response.data.results);
        } catch (error) {
            console.error("Error fetching recipes", error);
        }
        setLoading(false);
    };

    const renderContent = () => {
        if (loading) {
            // Show 6 skeleton loaders
            return Array.from({ length: 6 }).map((_, index) => (
                <RecipeCardSkeleton key={index} />
            ));
        }

        if (recipes.length > 0) {
            return recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} showSaveButton={true} />
            ));
        }

        if (searched) {
            // If a search was made but no results were found
            return (
                <div className="col-span-full text-center py-10">
                    <p className="text-2xl">😕</p>
                    <h3 className="text-xl font-semibold mt-4">No Recipes Found</h3>
                    <p className="text-gray-500">Try searching for something else, like "vegan pasta".</p>
                </div>
            );
        }

        // Initial state before any search
        return (
            <div className="col-span-full text-center py-10">
                <p className="text-2xl">🥗</p>
                <h3 className="text-xl font-semibold mt-4">Discover Your Next Favorite Meal</h3>
                <p className="text-gray-500">Use the search bar above to find delicious recipes for the upcoming weekend.</p>
            </div>
        );
    };

    return (
        <div>
            {/* Redesigned Search Bar */}
            <div className="mb-12">
                <form onSubmit={searchRecipes} className="max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for 'chicken', 'soup', 'dessert'..."
                            className="w-full p-4 pl-10 text-lg border rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                </form>
            </div>

            {/* Dynamic Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default SearchPage;