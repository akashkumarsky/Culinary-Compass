package com.sky.backend.controller;

import com.sky.backend.dto.PlannedMealDto;
import com.sky.backend.model.MealPlan;
import com.sky.backend.model.PlannedMeal;
import com.sky.backend.service.MealPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sky.backend.dto.MealPlanResponseDto;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;

import java.security.Principal;

@RestController
@RequestMapping("/api/meal-plan")
public class MealPlanController {

    private final MealPlanService mealPlanService;

    public MealPlanController(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }

   @GetMapping
public ResponseEntity<MealPlanResponseDto> getMyMealPlan(Principal principal) {
    MealPlanResponseDto mealPlanDto = mealPlanService.getMealPlanForUser(principal.getName());
    return ResponseEntity.ok(mealPlanDto);
}

    @PostMapping("/add")
    public ResponseEntity<PlannedMeal> addMealToMyPlan(Principal principal, @RequestBody PlannedMealDto plannedMealDto) {
        PlannedMeal plannedMeal = mealPlanService.addMealToPlan(principal.getName(), plannedMealDto);
        return ResponseEntity.ok(plannedMeal);
    }

    @DeleteMapping("/remove/{plannedMealId}")
public ResponseEntity<?> removeMealFromMyPlan(Principal principal, @PathVariable Long plannedMealId) {
    mealPlanService.removeMealFromPlan(principal.getName(), plannedMealId);
    return ResponseEntity.ok("Meal removed successfully.");
}

@GetMapping("/week")
public ResponseEntity<List<PlannedMeal>> getWeekMeals(Principal principal, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
    List<PlannedMeal> meals = mealPlanService.getMealsForWeek(principal.getName(), startDate);
    return ResponseEntity.ok(meals);
}
}