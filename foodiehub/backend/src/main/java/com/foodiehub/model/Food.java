package com.foodiehub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "foods")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long restaurantId;
    private String name;
    private String category;   // Starters, Main Course, Pizza, Burgers, Biryani, Desserts, Beverages
    private String description;
    private String image;
    private boolean veg;
    private double rating;
    private double price;
}
