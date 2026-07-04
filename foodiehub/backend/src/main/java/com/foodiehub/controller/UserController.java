package com.foodiehub.controller;

import com.foodiehub.exception.ApiException;
import com.foodiehub.model.User;
import com.foodiehub.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<User> getProfile(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        User user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new ApiException("User not found"));
        user.setPassword(null); // never expose password hash
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateProfile(@RequestBody User updates, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        User user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new ApiException("User not found"));

        if (updates.getFullName() != null) user.setFullName(updates.getFullName());
        if (updates.getMobileNumber() != null) user.setMobileNumber(updates.getMobileNumber());
        if (updates.getAddress() != null) user.setAddress(updates.getAddress());
        if (updates.getProfileImage() != null) user.setProfileImage(updates.getProfileImage());

        User saved = userRepository.save(user);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }
}
