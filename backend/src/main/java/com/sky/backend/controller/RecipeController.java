package com.sky.backend.controller;

import com.sky.backend.model.Recipe;
import com.sky.backend.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveRecipe(Principal principal, @RequestBody Recipe recipe) {
        recipeService.saveRecipe(principal.getName(), recipe);
        return ResponseEntity.ok("Recipe saved successfully!");
    }

        @GetMapping("/saved")
    public ResponseEntity<Set<Recipe>> getSavedRecipes(Principal principal) {
        Set<Recipe> recipes = recipeService.getSavedRecipes(principal.getName());
        return ResponseEntity.ok(recipes);
    }

    @DeleteMapping("/remove/{recipeId}")
    public ResponseEntity<?> removeRecipe(Principal principal, @PathVariable Long recipeId) {
    try {
        recipeService.removeRecipe(principal.getName(), recipeId);
        return ResponseEntity.ok("Recipe removed successfully!");
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }
}