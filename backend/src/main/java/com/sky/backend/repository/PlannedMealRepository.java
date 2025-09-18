package com.sky.backend.repository;

import com.sky.backend.model.PlannedMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface PlannedMealRepository extends JpaRepository<PlannedMeal, Long> {
    // Find all meals for a specific user within a date range
    List<PlannedMeal> findByMealPlan_User_UsernameAndMealDateBetween(String username, LocalDate startDate, LocalDate endDate);
}