package com.sky.backend.service;

import com.sky.backend.model.Recipe;
import com.sky.backend.model.User;
import com.sky.backend.repository.RecipeRepository;
import com.sky.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class RecipeService {
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public RecipeService(UserRepository userRepository, RecipeRepository recipeRepository) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    @Transactional
    public User saveRecipe(String username, Recipe recipe) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // If the recipe doesn't exist in our DB, save it first.
        if (!recipeRepository.existsById(recipe.getId())) {
            recipeRepository.save(recipe);
        }

        user.getSavedRecipes().add(recipe);
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Set<Recipe> getSavedRecipes(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getSavedRecipes();
    }

    @Transactional
    public void removeRecipe(String username, Long recipeId) {
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Recipe recipeToRemove = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new RuntimeException("Recipe not found"));

    user.getSavedRecipes().remove(recipeToRemove);
    userRepository.save(user);
}
}