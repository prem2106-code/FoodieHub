package com.foodiehub.controller;

import com.foodiehub.model.Food;
import com.foodiehub.service.FoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getByRestaurant(@PathVariable String restaurantId) {
        return ResponseEntity.ok(foodService.getByRestaurant(restaurantId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getById(@PathVariable String id) {
        return ResponseEntity.ok(foodService.getById(id));
    }
}
