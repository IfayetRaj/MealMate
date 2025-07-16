import React, { useState, useEffect, useContext } from 'react';
import AddMeal from './AddMeal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';

const AdminUpcomingMeal = () => {
  const [showModal, setShowModal] = useState(false);
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const {userData} = useContext(AuthContext);
  const { displayName, email } = userData 

  // Fetch upcoming meals from backend on mount
  useEffect(() => {
    fetchUpcomingMeals();
  }, []);

  const fetchUpcomingMeals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/upcoming-meals`);
      setUpcomingMeals(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load upcoming meals.");
    }
  };

  const handleAddUpcomingMeal = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upcoming-meals`, data);
      if (res.data.success) {
        toast.success("Upcoming Meal added!");
        setShowModal(false);
        fetchUpcomingMeals(); // Refresh list
      } else {
        toast.error("Failed to add meal.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding upcoming meal.");
    }
  };

  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto relative my-5 md:my-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-7 md:gap-5">
        <h3 className="text-2xl font-bold text-gray-800">Upcoming Meals</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 border w-full md:w-fit border-black text-black rounded-sm md:rounded-3xl outline-4 outline-offset-4 hover:bg-black hover:text-white transition"
        >
          Add Upcoming Meal
        </button>
      </div>

      <table className="w-full md:min-w-[600px] border-collapse ">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="p-3 md:p-4">Title</th>
            <th className="p-3 md:p-4">Category</th>
            <th className="p-3 md:p-4">Price</th>
            <th className="p-3 md:p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {upcomingMeals.map((meal) => (
            <tr key={meal._id} className="border-b hover:bg-gray-50">
              <td className="p-3 md:p-4">{meal.title}</td>
              <td className="p-3 md:p-4">{meal.category}</td>
              <td className="p-3 md:p-4">{meal.price}</td>
              <td className="p-3 md:p-4">
                <button className="px-4 md:px-6 py-2 rounded-3xl border-2 bg-black text-white font-semibold border-black active:scale-95">
                  Publish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Upcoming Meal</h3>
            <AddMeal
              adminName={displayName}
              adminEmail={email}
              onSubmit={handleAddUpcomingMeal}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminUpcomingMeal;