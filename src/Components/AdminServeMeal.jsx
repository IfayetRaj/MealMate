import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminServeMeal = () => {
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 10;

  useEffect(() => {
    const fetchRequestedMeals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/requested-meals`
        );
        setRequestedMeals(response.data);
      } catch (error) {
        console.error("Error fetching requested meals:", error);
        throw new Error("Failed to fetch requested meals");
      }
    };
    fetchRequestedMeals();
  }, []);

  const handleOnclick = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/requested-meals/${id}`,
        { status: "Served" }
      );
      toast.success("Meal marked as served!");

      // Update local list immediately
      setRequestedMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal._id === id ? { ...meal, status: "Served" } : meal
        )
      );
    } catch (error) {
      console.error("Error updating meal status:", error);
      toast.error("Failed to update meal status");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(requestedMeals.length / mealsPerPage);
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = requestedMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto my-5 md:my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Serve Meals</h3>
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="p-3 md:p-4">Title</th>
            <th className="p-3 md:p-4">User Email</th>
            <th className="p-3 md:p-4">User Name</th>
            <th className="p-3 md:p-4">Status</th>
            <th className="p-3 md:p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentMeals.map((meal) => (
            <tr key={meal._id} className="border-b hover:bg-gray-50">
              <td className="p-3 md:p-4">{meal.mealTitle}</td>
              <td className="p-3 md:p-4">{meal.userEmail}</td>
              <td className="p-3 md:p-4">{meal.userName}</td>
              <td className="p-3 md:p-4">{meal.status}</td>
              <td className="p-3 md:p-4">
                <button
                  onClick={() => handleOnclick(meal._id)}
                  disabled={meal.status === "Served"}
                  className={`px-4 md:px-6 py-2 rounded-3xl border-2 
                    ${
                      meal.status === "Served"
                        ? "bg-green-400 border-none"
                        : "bg-black border-black"
                    } 
                    text-white font-semibold active:scale-95 
                    ${
                      meal.status === "Served"
                        ? "cursor-not-allowed opacity-70"
                        : ""
                    }`}
                >
                  {meal.status === "Served" ? "Served" : "Serve"}
                </button>
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

export default AdminServeMeal;