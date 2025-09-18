package com.sky.backend.dto;

import java.util.Set;

public record MealPlanResponseDto(Long id, Set<PlannedMealResponseDto> plannedMeals) {
}