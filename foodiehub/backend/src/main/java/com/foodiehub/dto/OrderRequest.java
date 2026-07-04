package com.foodiehub.dto;

import com.foodiehub.model.OrderItem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    @NotBlank(message = "Restaurant id is required")
    private String restaurantId;

    private String restaurantName;

    @NotEmpty(message = "Cart cannot be empty")
    private List<OrderItem> items;

    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
}
