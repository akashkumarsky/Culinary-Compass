import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, showSaveButton = true, onRemove }) => {
    // Define the base URL using the environment variable for production, with a fallback for local development.
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088';

    const handleSave = async () => {
        try {
            const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
            const detailsResponse = await axios.get(
                `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
            );

            const recipeData = {
                id: detailsResponse.data.id,
                title: detailsResponse.data.title,
                image: detailsResponse.data.image,
                summary: detailsResponse.data.summary,
            };

            // Use the API_URL variable for the backend endpoint.
            await axios.post(`${API_URL}/api/recipes/save`, recipeData);
            alert('Recipe saved!');
        } catch (error) {
            alert('Failed to save recipe.');
            console.error('Error saving recipe:', error.response?.data || error.message);
        }
    };

    const handleRemove = async () => {
        try {
            // Use the API_URL variable for the backend endpoint.
            await axios.delete(`${API_URL}/api/recipes/remove/${recipe.id}`);
            alert('Recipe removed!');
            if (onRemove) onRemove(recipe.id);
        } catch (error) {
            alert('Failed to remove recipe.');
            console.error('Error removing recipe:', error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
            <Link to={`/recipe/${recipe.id}`} className="block relative">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-56 object-cover brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-all duration-300"></div>
                <h3 className="absolute bottom-0 left-0 p-4 text-xl font-bold text-white drop-shadow-lg">
                    {recipe.title}
                </h3>
            </Link>

            <div className="p-4">
                {showSaveButton && (
                    <div className="flex justify-between text-sm text-gray-300 mb-4">
                        <span className="flex items-center">🕒 {recipe.readyInMinutes || 'N/A'} min</span>
                        <span className="flex items-center">👨‍👩‍👧 Servings: {recipe.servings || 'N/A'}</span>
                    </div>
                )}

                {showSaveButton ? (
                    <button
                        onClick={handleSave}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                    >
                        Save Recipe
                    </button>
                ) : (
                    <button
                        onClick={handleRemove}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;