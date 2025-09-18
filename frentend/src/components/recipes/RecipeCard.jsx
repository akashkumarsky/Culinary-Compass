import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, showSaveButton = true, onRemove }) => {
    const handleSave = async () => {
        try {
            const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
            const detailsResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`);

            const recipeData = {
                id: detailsResponse.data.id,
                title: detailsResponse.data.title,
                image: detailsResponse.data.image,
                summary: detailsResponse.data.summary,
            };

            await axios.post('http://localhost:8088/api/recipes/save', recipeData);
            alert('Recipe saved!');
        } catch (error) {
            alert('Failed to save recipe.');
            console.error('Error saving recipe', error);
        }
    };

    const handleRemove = async () => {
        try {
            await axios.delete(`http://localhost:8088/api/recipes/remove/${recipe.id}`);
            alert('Recipe removed!');
            if (onRemove) {
                onRemove(recipe.id);
            }
        } catch (error) {
            alert('Failed to remove recipe.');
            console.error('Error removing recipe', error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
            <Link to={`/recipe/${recipe.id}`} className="block">
                <div className="relative">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                    <h3 className="absolute bottom-0 left-0 p-4 text-xl font-bold text-white">
                        {recipe.title}
                    </h3>
                </div>
            </Link>
            <div className="p-4">
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                        🕒 {recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : 'N/A'}
                    </span>
                    <span className="flex items-center">
                        👨‍👩‍👧 Servings: {recipe.servings || 'N/A'}
                    </span>
                </div>
                <div className="mt-4">
                    {showSaveButton ? (
                        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
                            Save Recipe
                        </button>
                    ) : (
                        <button onClick={handleRemove} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full">
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    ); // <-- THIS IS THE MISSING PIECE
};

export default RecipeCard;