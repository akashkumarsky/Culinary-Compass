import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingList = ({ weekMeals }) => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateList = async () => {
            setLoading(true);
            const ingredientMap = new Map();
            const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

            const uniqueRecipeIds = [...new Set(weekMeals.map(meal => meal.recipe.id))];

            for (const recipeId of uniqueRecipeIds) {
                try {
                    const response = await axios.get(
                        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`
                    );
                    response.data.extendedIngredients.forEach(ing => {
                        const name = ing.nameClean || ing.name;
                        const existing = ingredientMap.get(name);
                        if (existing) {
                            if (existing.unit === ing.unit) {
                                existing.amount += ing.amount;
                            } else {
                                ingredientMap.set(`${name}-${ing.unit}`, { name, amount: ing.amount, unit: ing.unit });
                            }
                        } else {
                            ingredientMap.set(name, { name, amount: ing.amount, unit: ing.unit });
                        }
                    });
                } catch (error) {
                    console.error(`Failed to fetch ingredients for recipe ${recipeId}`, error);
                }
            }
            setIngredients(Array.from(ingredientMap.values()));
            setLoading(false);
        };

        if (weekMeals.length > 0) {
            generateList();
        } else {
            setLoading(false);
            setIngredients([]);
        }
    }, [weekMeals]);

    if (loading) return (
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-2xl mt-8 text-center">
            <p>Generating shopping list...</p>
        </div>
    );

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-2xl mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-300 drop-shadow-lg">Shopping List for the Week</h2>
            {ingredients.length > 0 ? (
                <ul className="list-none space-y-3">
                    {ingredients.map((ing, index) => (
                        <li key={index} className="flex items-center justify-between border-b border-gray-700 pb-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-3 h-5 w-5 accent-green-500 hover:accent-green-400 transition-all"
                                />
                                <span className="font-semibold">{ing.name}:</span>
                            </div>
                            <span className="ml-2 text-gray-300">{ing.amount.toFixed(2)} {ing.unit}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 mt-2">Plan some meals this week to generate a shopping list!</p>
            )}
        </div>
    );
};

export default ShoppingList;
