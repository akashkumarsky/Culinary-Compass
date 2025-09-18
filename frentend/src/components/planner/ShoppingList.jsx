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

            // Create a set of unique recipe IDs to avoid duplicate API calls
            const uniqueRecipeIds = [...new Set(weekMeals.map(meal => meal.recipe.id))];

            // Fetch details for each unique recipe
            for (const recipeId of uniqueRecipeIds) {
                try {
                    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`);
                    response.data.extendedIngredients.forEach(ing => {
                        const name = ing.nameClean || ing.name; // Use clean name if available
                        const existing = ingredientMap.get(name);
                        if (existing) {
                            // Basic aggregation (doesn't handle unit conversion)
                            if (existing.unit === ing.unit) {
                                existing.amount += ing.amount;
                            } else {
                                // For simplicity, just add as a separate line if units differ
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

    if (loading) return <div className="bg-white p-6 rounded-lg shadow-lg mt-8"><p>Generating shopping list...</p></div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Shopping List for the Week</h2>
            {ingredients.length > 0 ? (
                <ul className="list-none space-y-2">
                    {ingredients.map((ing, index) => (
                        <li key={index} className="flex items-center border-b pb-1">
                            <input type="checkbox" className="mr-3 h-4 w-4" />
                            <span className="font-semibold">{ing.name}:</span>
                            <span className="ml-2">{ing.amount.toFixed(2)} {ing.unit}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Plan some meals this week to generate a shopping list!</p>
            )}
        </div>
    );
};

export default ShoppingList;