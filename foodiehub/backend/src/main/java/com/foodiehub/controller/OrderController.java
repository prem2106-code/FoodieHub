package com.foodiehub.controller;

import com.foodiehub.dto.OrderRequest;
import com.foodiehub.model.Order;
import com.foodiehub.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequest request, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        return ResponseEntity.ok(orderService.placeOrder(userId, request));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> myOrders(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable String id, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        return ResponseEntity.ok(orderService.getById(id, userId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
}
