import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { MdDeleteSweep } from "react-icons/md";
import { GrView, GrUpdate } from "react-icons/gr";

const AdminAllMeal = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const mealsPerPage = 10;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/meals`
        );
        setAllMeals(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch meals");
      }
    };
    fetchMeals();
  }, []);

  const handleDelete = async (mealId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/meals/${mealId}`
      );
      if (response) {
        toast.success("Meal deleted successfully");
        setAllMeals(allMeals.filter((meal) => meal._id !== mealId));
      } else {
        toast.error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Failed to delete meal");
    }
  };

  // Pagination helpers
  const totalPages = Math.ceil(allMeals.length / mealsPerPage);
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = allMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto my-5 md:my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">All Meals</h3>
      <p className="text-gray-500 mb-4 text-sm">
        Sorted by Likes & Reviews Count (server side)
      </p>

      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
            <th className="p-4">Title</th>
            <th className="p-4">Likes</th>
            <th className="p-4">Reviews</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Distributor</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMeals.map((meal) => (
            <tr key={meal._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-semibold">{meal.title}</td>
              <td className="p-4 font-semibold">{meal.likes}</td>
              <td className="p-4 font-semibold">{meal.reviews}</td>
              <td className="p-4 font-semibold">{meal.rating}</td>
              <td className="p-4 font-semibold">{meal.distributorName}</td>
              <td className="p-4">
                <div className="flex flex-wrap md:flex-nowrap gap-3">
                  <Link to={`/update-meal/${meal._id}`}>
                    <button className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition text-white shadow hover:shadow-lg active:scale-95">
                      <GrUpdate size={20} />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition text-white shadow hover:shadow-lg active:scale-95"
                  >
                    <MdDeleteSweep size={22} />
                  </button>

                  <Link to={`/meal-details/${meal._id}`}>
                    <button className="p-3 rounded-full bg-green-600 hover:bg-green-700 transition text-white shadow hover:shadow-lg active:scale-95">
                      <GrView size={20} />
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Prev
        </button>

        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AdminAllMeal;