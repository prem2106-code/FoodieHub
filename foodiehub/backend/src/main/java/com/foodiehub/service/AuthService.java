package com.foodiehub.service;

import com.foodiehub.dto.AuthResponse;
import com.foodiehub.dto.LoginRequest;
import com.foodiehub.dto.SignupRequest;
import com.foodiehub.exception.ApiException;
import com.foodiehub.model.User;
import com.foodiehub.repository.UserRepository;
import com.foodiehub.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void signup(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ApiException("Passwords do not match");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("An account with this email already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setProfileImage(request.getProfileImage());
        user.setRole("USER");

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(String.valueOf(user.getId()), user.getEmail(), user.getRole());

        return new AuthResponse(token, String.valueOf(user.getId()), user.getFullName(), user.getEmail(), user.getRole());
    }
}
