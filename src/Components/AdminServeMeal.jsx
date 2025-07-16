import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const AdminServeMeal = () => {
  const [requestedMeals, setRequestedMeals] = useState([]);

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
    } catch (error) {
      console.error("Error updating meal status:", error);
      toast.error("Failed to update meal status");
    }
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
          {requestedMeals.map((meal) => (
            <tr key={meal.id} className="border-b hover:bg-gray-50">
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
    ${meal.status === "Served" ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  {meal.status === "Served" ? "Served" : "Serve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminServeMeal;
