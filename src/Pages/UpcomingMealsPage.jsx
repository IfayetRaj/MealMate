import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import axios from 'axios';
const UpcomingMealsPage = () => {

  const [upcomingMeals, setUpcomingMeals] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/upcoming-meals`);
        if (res.data) {
          setUpcomingMeals(res.data); // ✅ FIXED
        }
      } catch (err) {
        console.error("Failed to fetch upcoming meals:", err);
      }
    };
    fetching();
  }, []);

  return (
    <div className='py-10'>
        <h1 className='text-center text-4xl md:text-5xl font-extrabold'>Upcoming Meals</h1>



        <div className="grid grid-cols-2 md:grid-cols-3 gap-7 w-[90%] md:w-[75%] mt-9 mx-auto">
            {
                upcomingMeals.map((meal)=> <Card meal={meal}></Card>)
            }
        </div>
    </div>
  )
}

export default UpcomingMealsPage