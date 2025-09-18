package com.sky.backend.service;

import com.sky.backend.dto.MealPlanResponseDto;
import com.sky.backend.dto.PlannedMealDto;
import com.sky.backend.dto.PlannedMealResponseDto;
import com.sky.backend.dto.RecipeDto;
import com.sky.backend.model.*;
import com.sky.backend.repository.PlannedMealRepository;
import com.sky.backend.repository.RecipeRepository;
import com.sky.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.util.List;

@Service
public class MealPlanService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final PlannedMealRepository plannedMealRepository;

    public MealPlanService(UserRepository userRepository, RecipeRepository recipeRepository, PlannedMealRepository plannedMealRepository) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.plannedMealRepository = plannedMealRepository;
    }

    @Transactional
    public MealPlanResponseDto getMealPlanForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getMealPlan() == null) {
            MealPlan newMealPlan = new MealPlan();
            user.setMealPlan(newMealPlan);
            userRepository.save(user);
        }

        return convertToDto(user.getMealPlan());
    }

    @Transactional
    public PlannedMeal addMealToPlan(String username, PlannedMealDto dto) {
        // --- THIS IS THE FIX ---
        // 1. Fetch the User entity first
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Get the MealPlan entity from the User (and create if it doesn't exist)
        MealPlan mealPlan = user.getMealPlan();
        if (mealPlan == null) {
            mealPlan = new MealPlan();
            user.setMealPlan(mealPlan);
            // The user save will cascade and save the new meal plan
            userRepository.save(user);
        }

        Recipe recipe = recipeRepository.findById(dto.recipeId())
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        PlannedMeal newPlannedMeal = new PlannedMeal();
        newPlannedMeal.setMealPlan(mealPlan);
        newPlannedMeal.setRecipe(recipe);
        newPlannedMeal.setMealDate(dto.mealDate());
        newPlannedMeal.setMealType(dto.mealType());

        return plannedMealRepository.save(newPlannedMeal);
    }

    private MealPlanResponseDto convertToDto(MealPlan mealPlan) {
        Set<PlannedMealResponseDto> plannedMealDtos = mealPlan.getPlannedMeals().stream()
                .map(plannedMeal -> new PlannedMealResponseDto(
                        plannedMeal.getId(),
                        plannedMeal.getMealDate(),
                        plannedMeal.getMealType(),
                        new RecipeDto(
                                plannedMeal.getRecipe().getId(),
                                plannedMeal.getRecipe().getTitle(),
                                plannedMeal.getRecipe().getImage()
                        )
                ))
                .collect(Collectors.toSet());

        return new MealPlanResponseDto(mealPlan.getId(), plannedMealDtos);
    }

    @Transactional
public void removeMealFromPlan(String username, Long plannedMealId) {
    // Ensure the meal belongs to the user before deleting
    PlannedMeal meal = plannedMealRepository.findById(plannedMealId)
            .orElseThrow(() -> new RuntimeException("Planned meal not found"));
    if (!meal.getMealPlan().getUser().getUsername().equals(username)) {
        throw new SecurityException("User not authorized to delete this meal");
    }
    plannedMealRepository.deleteById(plannedMealId);
}

// Note: The shopping list logic is complex and would typically involve a dedicated DTO and Spoonacular calls.
// For simplicity, we'll return the planned meals for the week, and the frontend will handle the ingredient logic.
@Transactional(readOnly = true)
public List<PlannedMeal> getMealsForWeek(String username, LocalDate startDate) {
    LocalDate endDate = startDate.plusDays(6);
    return plannedMealRepository.findByMealPlan_User_UsernameAndMealDateBetween(username, startDate, endDate);
}
}