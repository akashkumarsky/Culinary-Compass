import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/recipes/RecipeCard';

const MyRecipesPage = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleRemoveRecipe = (removedRecipeId) => {
        setSavedRecipes(currentRecipes =>
            currentRecipes.filter(recipe => recipe.id !== removedRecipeId)
        );
    };

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/recipes/saved`
                );
                setSavedRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch saved recipes', error);
            }
            setLoading(false);
        };

        fetchSavedRecipes();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">My Saved Recipes</h1>
            {loading ? (
                <p>Loading your recipes...</p>
            ) : savedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {savedRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            showSaveButton={false}
                            onRemove={handleRemoveRecipe}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center">You haven't saved any recipes yet.</p>
            )}
        </div>
    );
};

export default MyRecipesPage;
