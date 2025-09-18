package com.sky.backend.dto;

import com.sky.backend.model.MealType;
import java.time.LocalDate;

public record PlannedMealResponseDto(Long id, LocalDate mealDate, MealType mealType, RecipeDto recipe) {
}