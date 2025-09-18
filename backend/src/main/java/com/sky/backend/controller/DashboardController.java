package com.sky.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/welcome")
    public ResponseEntity<String> getWelcomeMessage(Principal principal) {
        // The 'Principal' object is automatically populated by Spring Security
        // with the details of the currently authenticated user.
        String message = "Welcome to your protected dashboard, " + principal.getName() + "!";
        return ResponseEntity.ok(message);
    }
}