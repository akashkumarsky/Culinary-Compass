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
                // Axios automatically sends the auth token
                const response = await axios.get('http://localhost:8088/api/recipes/saved');
                setSavedRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch saved recipes', error);
            }
            setLoading(false);
        };

        fetchSavedRecipes();
    }, []); // Empty dependency array means this runs once on component mount

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
                            onRemove={handleRemoveRecipe} // <-- Pass the handler function
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