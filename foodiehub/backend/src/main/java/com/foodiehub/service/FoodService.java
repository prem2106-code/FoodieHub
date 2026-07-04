package com.foodiehub.service;

import com.foodiehub.exception.ApiException;
import com.foodiehub.model.Food;
import com.foodiehub.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getByRestaurant(String restaurantId) {
        return foodRepository.findByRestaurantId(Long.valueOf(restaurantId));
    }

    public Food getById(String id) {
        return foodRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ApiException("Food item not found"));
    }

    public Food create(Food food) {
        return foodRepository.save(food);
    }

    public Food update(String id, Food updated) {
        Food existing = getById(id);
        updated.setId(existing.getId());
        return foodRepository.save(updated);
    }

    public void delete(String id) {
        foodRepository.deleteById(Long.valueOf(id));
    }
}
