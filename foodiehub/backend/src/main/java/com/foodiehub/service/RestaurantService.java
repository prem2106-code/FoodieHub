package com.foodiehub.service;

import com.foodiehub.exception.ApiException;
import com.foodiehub.model.Restaurant;
import com.foodiehub.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getAll() {
        return restaurantRepository.findAll();
    }

    public Restaurant getById(String id) {
        return restaurantRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ApiException("Restaurant not found"));
    }

    public Restaurant create(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant update(String id, Restaurant updated) {
        Restaurant existing = getById(id);
        updated.setId(existing.getId());
        return restaurantRepository.save(updated);
    }

    public void delete(String id) {
        restaurantRepository.deleteById(Long.valueOf(id));
    }
}
