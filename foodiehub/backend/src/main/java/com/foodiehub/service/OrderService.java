package com.foodiehub.service;

import com.foodiehub.dto.OrderRequest;
import com.foodiehub.exception.ApiException;
import com.foodiehub.model.Order;
import com.foodiehub.model.OrderItem;
import com.foodiehub.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private static final double GST_RATE = 0.05;
    private static final double DELIVERY_CHARGE = 40.0;

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order placeOrder(String userId, OrderRequest request) {
        double subtotal = 0.0;
        for (OrderItem item : request.getItems()) {
            subtotal += item.getPrice() * item.getQuantity();
        }

        double gst = round(subtotal * GST_RATE);
        double deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0;
        double grandTotal = round(subtotal + gst + deliveryCharge);

        Order order = new Order();
        order.setUserId(Long.valueOf(userId));
        order.setRestaurantId(Long.valueOf(request.getRestaurantId()));
        order.setRestaurantName(request.getRestaurantName());
        order.setItems(request.getItems());
        order.setSubtotal(round(subtotal));
        order.setGst(gst);
        order.setDeliveryCharge(deliveryCharge);
        order.setGrandTotal(grandTotal);
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setMobileNumber(request.getMobileNumber());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus("PLACED");

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(Long.valueOf(userId));
    }

    public Order getById(String id, String userId) {
        Order order = orderRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ApiException("Order not found"));
        if (!order.getUserId().equals(Long.valueOf(userId))) {
            throw new ApiException("You are not authorized to view this order");
        }
        return order;
    }

    public Order updateStatus(String id, String status) {
        Order order = orderRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ApiException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
