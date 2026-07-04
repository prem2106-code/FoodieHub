package com.foodiehub.config;

import com.foodiehub.model.Food;
import com.foodiehub.model.Restaurant;
import com.foodiehub.repository.FoodRepository;
import com.foodiehub.repository.RestaurantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the database with sample restaurants and food items on first run,
 * so the app has real data to show without any manual setup.
 * Safe to run repeatedly - it only seeds when the restaurants collection is empty.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final RestaurantRepository restaurantRepository;
    private final FoodRepository foodRepository;

    public DataSeeder(RestaurantRepository restaurantRepository, FoodRepository foodRepository) {
        this.restaurantRepository = restaurantRepository;
        this.foodRepository = foodRepository;
    }

    @Override
    public void run(String... args) {
        if (restaurantRepository.count() > 0) {
            return; // already seeded
        }

        Restaurant kfc = restaurantRepository.save(new Restaurant(null, "KFC",
                "American, Fast Food",
                "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",
                "25-30 mins", 4.3, "50% OFF up to ₹100", "Finger lickin' good fried chicken."));

        Restaurant dominos = restaurantRepository.save(new Restaurant(null, "Domino's Pizza",
                "Pizza, Italian",
                "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800",
                "20-25 mins", 4.1, "Buy 1 Get 1 Free", "Hot, fresh pizza delivered fast."));

        Restaurant burgerKing = restaurantRepository.save(new Restaurant(null, "Burger King",
                "Burgers, Fast Food",
                "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
                "20-25 mins", 4.0, "Flat ₹75 OFF", "Home of the flame-grilled Whopper."));

        Restaurant saravana = restaurantRepository.save(new Restaurant(null, "Saravana Bhavan",
                "South Indian, Vegetarian",
                "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800",
                "30-35 mins", 4.6, "20% OFF on orders above ₹300", "Authentic South Indian vegetarian meals."));

        Restaurant biryani = restaurantRepository.save(new Restaurant(null, "SS Hyderabad Biryani",
                "Biryani, Mughlai",
                "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
                "35-40 mins", 4.5, "Free Raita on every order", "Slow-cooked dum biryani, Hyderabadi style."));

        foodRepository.saveAll(List.of(
                new Food(null, kfc.getId(), "Hot & Crispy Chicken Bucket", "Starters",
                        "8 pieces of crispy fried chicken", "https://images.unsplash.com/photo-1562967914-608f82629710?w=600",
                        false, 4.4, 449),
                new Food(null, kfc.getId(), "Zinger Burger", "Burgers",
                        "Spicy crispy chicken fillet burger", "https://images.unsplash.com/photo-1615297928064-24977384d0da?w=600",
                        false, 4.3, 189),
                new Food(null, kfc.getId(), "Veg Strips", "Starters",
                        "Crispy fried veg strips with dip", "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600",
                        true, 4.0, 159),

                new Food(null, dominos.getId(), "Margherita Pizza", "Pizza",
                        "Classic cheese and tomato pizza", "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
                        true, 4.2, 199),
                new Food(null, dominos.getId(), "Chicken Pepperoni Pizza", "Pizza",
                        "Loaded with pepperoni and cheese", "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
                        false, 4.5, 349),
                new Food(null, dominos.getId(), "Garlic Breadsticks", "Starters",
                        "Cheesy garlic breadsticks", "https://images.unsplash.com/photo-1619535860434-ba1d8fa32b60?w=600",
                        true, 4.1, 129),

                new Food(null, burgerKing.getId(), "Whopper", "Burgers",
                        "Flame-grilled beef-style patty burger", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
                        false, 4.4, 219),
                new Food(null, burgerKing.getId(), "Veg Crunch Burger", "Burgers",
                        "Crunchy veg patty with fresh veggies", "https://images.unsplash.com/photo-1550317138-10000687a72b?w=600",
                        true, 4.0, 149),

                new Food(null, saravana.getId(), "Masala Dosa", "Main Course",
                        "Crispy dosa with spiced potato filling", "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600",
                        true, 4.6, 129),
                new Food(null, saravana.getId(), "Idli Sambar", "Main Course",
                        "Steamed rice cakes with sambar", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600",
                        true, 4.5, 99),
                new Food(null, saravana.getId(), "Filter Coffee", "Beverages",
                        "Authentic South Indian filter coffee", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
                        true, 4.7, 49),

                new Food(null, biryani.getId(), "Chicken Dum Biryani", "Biryani",
                        "Slow-cooked basmati rice with chicken", "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
                        false, 4.7, 259),
                new Food(null, biryani.getId(), "Veg Biryani", "Biryani",
                        "Fragrant basmati rice with mixed vegetables", "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600",
                        true, 4.3, 199),
                new Food(null, biryani.getId(), "Double Ka Meetha", "Desserts",
                        "Traditional Hyderabadi bread pudding", "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600",
                        true, 4.4, 89)
        ));

        System.out.println("Sample restaurants and foods seeded successfully.");
    }
}
