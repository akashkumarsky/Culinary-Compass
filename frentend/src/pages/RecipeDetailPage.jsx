import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetailPage = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Failed to fetch recipe details", error);
            }
            setLoading(false);
        };
        fetchRecipeDetails();
    }, [id]); // Re-run effect if the ID in the URL changes

    if (loading) return <p>Loading recipe details...</p>;
    if (!recipe) return <p>Recipe not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover rounded-lg mb-6 shadow-lg" />

            <h2 className="text-2xl font-semibold mb-2">Summary</h2>
            {/* Spoonacular summary contains HTML tags, so we use dangerouslySetInnerHTML */}
            <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>

            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside mb-6">
                {recipe.extendedIngredients.map(ing => (
                    <li key={ing.id}>{ing.original}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetailPage;