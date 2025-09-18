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
            onMealAdded(response.data); // Send new meal data back to parent
            onClose();
        } catch (error) {
            console.error("Failed to add meal", error);
            alert("Failed to add meal.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Add a Recipe to {mealType}</h2>
                {loading ? <p>Loading saved recipes...</p> : (
                    <ul className="space-y-2 max-h-80 overflow-y-auto">
                        {savedRecipes.map(recipe => (
                            <li key={recipe.id}
                                onClick={() => handleSelectRecipe(recipe.id)}
                                className="flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
                                <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded mr-4" />
                                <span>{recipe.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddMealModal;