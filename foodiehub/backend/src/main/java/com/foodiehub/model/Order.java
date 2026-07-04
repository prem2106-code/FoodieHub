package com.foodiehub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long restaurantId;
    private String restaurantName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    private double subtotal;
    private double gst;
    private double deliveryCharge;
    private double grandTotal;

    private String deliveryAddress;
    private String mobileNumber;
    private String paymentMethod; // UPI, CARD, NETBANKING, COD, RAZORPAY

    // PLACED -> PREPARING -> PICKED_UP -> OUT_FOR_DELIVERY -> DELIVERED
    private String status = "PLACED";

    private LocalDateTime orderDate = LocalDateTime.now();
}
