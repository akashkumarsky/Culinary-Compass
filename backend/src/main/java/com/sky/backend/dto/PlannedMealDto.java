package com.sky.backend.dto;

import com.sky.backend.model.MealType;
import java.time.LocalDate;

public record PlannedMealDto(Long recipeId, LocalDate mealDate, MealType mealType) {
}