import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/recipes/RecipeCard";
import RecipeCardSkeleton from "../components/recipes/RecipeCardSkeleton";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setSearched(true);
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=12&apiKey=${apiKey}`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
    setLoading(false);
  };

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ));
    }

    if (recipes.length > 0) {
      return recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} showSaveButton={true} />
      ));
    }

    if (searched) {
      return (
        <div className="col-span-full text-center py-20 text-gray-300">
          <p className="text-3xl mb-2">😕</p>
          <h3 className="text-2xl font-semibold mb-1">No Recipes Found</h3>
          <p className="text-gray-400">
            Try searching for something else, like "vegan pasta".
          </p>
        </div>
      );
    }

    return (
      <div className="col-span-full text-center py-20 text-gray-300">
        <p className="text-3xl mb-2">🥗</p>
        <h3 className="text-2xl font-semibold mb-1">
          Discover Your Next Favorite Meal
        </h3>
        <p className="text-gray-400">
          Use the search bar above to find delicious recipes for the upcoming
          weekend.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 md:px-10 py-12">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative">
        <form onSubmit={searchRecipes}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes: 'chicken', 'soup', 'dessert'..."
              className="w-full p-4 pl-12 text-lg rounded-full bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg transition"
            />
          </div>
        </form>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default SearchPage;
