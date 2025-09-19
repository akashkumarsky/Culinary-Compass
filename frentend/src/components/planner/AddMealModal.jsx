import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMealModal = ({ date, mealType, onClose, onMealAdded }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8088/api/recipes/saved');
                setSavedRecipes(response.data);
            } catch (error) {
                console.error("Failed to fetch saved recipes", error);
            }
            setLoading(false);
        };
        fetchRecipes();
    }, []);

    const handleSelectRecipe = async (recipeId) => {
        try {
            const payload = {
                recipeId: recipeId,
                mealDate: date,
                mealType: mealType,
            };
            const response = await axios.post('http://localhost:8088/api/meal-plan/add', payload);
            onMealAdded(response.data);
            onClose();
        } catch (error) {
            console.error("Failed to add meal", error);
            alert("Failed to add meal.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-900/90 text-white p-6 rounded-2xl max-w-lg w-full shadow-2xl border border-green-700">
                <h2 className="text-2xl font-bold mb-4 text-green-300 drop-shadow-lg">
                    Add a Recipe to {mealType}
                </h2>
                {loading ? (
                    <p className="text-gray-400">Loading saved recipes...</p>
                ) : (
                    <ul className="space-y-3 max-h-80 overflow-y-auto">
                        {savedRecipes.map(recipe => (
                            <li
                                key={recipe.id}
                                onClick={() => handleSelectRecipe(recipe.id)}
                                className="flex items-center p-2 rounded-lg hover:bg-green-700 hover:bg-opacity-30 cursor-pointer transition-all duration-200"
                            >
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-16 h-16 object-cover rounded-lg mr-4 border border-green-600"
                                />
                                <span className="font-semibold">{recipe.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full font-bold transition-all duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddMealModal;
