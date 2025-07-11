import React, { useState } from "react";
import Card from "./Card";

const mealsData = {
  Breakfast: [
    {
      id: 1,
      title: "Pancakes",
      image: "https://images.unsplash.com/photo-1559628232-85a5e2db3f06?auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      price: 5.99,
      details: "Fluffy pancakes served with syrup and berries."
    },
    {
      id: 2,
      title: "Omelette",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
      rating: 4.2,
      price: 6.49,
      details: "Cheese and veggies omelette with toast."
    },
    {
      id: 3,
      title: "French Toast",
      image: "https://images.unsplash.com/photo-1505253210343-7deecf76ae1d?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      price: 7.0,
      details: "Classic French toast with powdered sugar."
    }
  ],
  Lunch: [
    {
      id: 4,
      title: "Grilled Chicken Salad",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
      rating: 4.3,
      price: 9.99,
      details: "Fresh greens with grilled chicken breast."
    },
    {
      id: 5,
      title: "Veggie Burger",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=400&q=80",
      rating: 4.0,
      price: 8.5,
      details: "Delicious plant-based burger with fries."
    },
    {
      id: 6,
      title: "Pasta Primavera",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      price: 10.25,
      details: "Pasta with fresh vegetables and parmesan."
    }
  ],
  Dinner: [
    {
      id: 7,
      title: "Steak with Veggies",
      image: "https://images.unsplash.com/photo-1555992336-03a23c4f4ce1?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      price: 15.99,
      details: "Juicy grilled steak with roasted vegetables."
    },
    {
      id: 8,
      title: "Salmon Fillet",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      price: 14.5,
      details: "Pan-seared salmon with lemon butter sauce."
    },
    {
      id: 9,
      title: "Veggie Stir Fry",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      rating: 4.3,
      price: 12.0,
      details: "Mixed vegetables stir fried with soy sauce."
    }
  ]
};

const allMeals = [
  ...mealsData.Breakfast,
  ...mealsData.Lunch,
  ...mealsData.Dinner
];

const MealsByCategory = () => {
  const [activeTab, setActiveTab] = useState("All");

  const getMeals = () => {
    if (activeTab === "All") return allMeals;
    return mealsData[activeTab] || [];
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mb-20">
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 text-center ">Meals by Category</h2>

      <div className="flex justify-center gap-4 mb-17">
        {["Breakfast", "Lunch", "Dinner", "All"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeTab === tab
                ? "bg-black text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
        {getMeals().map((meal) => (
          <Card key={meal.id} />
        ))}
      </div>

    <div className="flex justify-center mt-10">
        <button
            className="px-14 py-3 rounded-full bg-black text-white font-semibold shadow hover:bg-gray-800 transition"
        >
            View All
        </button>
    </div>
    </div>
  );
};

export default MealsByCategory;
