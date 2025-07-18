import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import axios from 'axios';

const UpcomingMealsPage = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/upcoming-meals`);
        if (res.data) {
          setUpcomingMeals(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch upcoming meals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, []);

  return (
    <div className="py-10">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold">
        Upcoming Meals
      </h1>

      {loading ? (
        <p className="text-center mt-12 text-gray-500 animate-pulse">
          Loading upcoming meals...
        </p>
      ) : upcomingMeals.length === 0 ? (
        <p className="text-center mt-12 text-2xl text-gray-600 transition-opacity duration-500 opacity-100">
          No upcoming meals found! 🍽️
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-7 w-[90%] md:w-[75%] mt-9 mx-auto">
          {upcomingMeals.map((meal) => (
            <Card key={meal._id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingMealsPage;