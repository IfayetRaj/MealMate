import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router";

const MealsByCategory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (category) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/meals-by-category?category=${category}`
      );
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeals(activeTab);
  }, [activeTab]);

  return (
    <div className="max-w-5xl mx-auto p-4 mb-20">
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 text-center ">
        Meals by Category
      </h2>

      <div className="flex justify-center gap-4 mb-8">
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
        {meals.map((meal) => (
          <Card key={meal._id} meal={meal} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/meals">
          <button className="px-14 py-3 rounded-full bg-black text-white font-semibold shadow hover:bg-gray-800 transition">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MealsByCategory;