package com.sky.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    private Long id; // We'll use the ID from the Spoonacular API

    @Column(nullable = false)
    private String title;

    private String image;

    @Column(columnDefinition = "TEXT")
    private String summary;
}