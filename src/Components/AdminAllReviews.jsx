import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const AdminAllReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetching();
  }, []);

  // handeling review delete
  const handleDelete = async (reviewId) => {  
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${reviewId}`
      );
      if (response.status === 200) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
        toast.success("Review deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };




  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto my-5 md:my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">All Reviews</h3>
      <table className="w-full md:min-w-[600px] border-collapse text-center">
        <thead>
          <tr className="bg-gray-100  text-gray-600 uppercase text-sm">
            <th className="p-3 md:p-4">Meal</th>
            <th className="p-3 md:p-4">Likes</th>
            <th className="p-3 md:p-4">Reviews</th>
            <th className="p-3 md:p-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reviews) &&
            reviews.map((review) => (
              <tr key={review._id} className="border-b hover:bg-gray-50">
                <td className="p-3 md:p-4">{review.title || "N/A"}</td>
                <td className="p-3 md:p-4">{review.likes || 0}</td>
                <td className="p-3 md:p-4">{review.reviews || "No review"}</td>
                <td className="p-3 md:p-4 flex flex-wrap flex-col md:flex-row gap-2 justify-center w-fit">
                  <Link to={`/meal-details/${review.mealId}`}>
                  <button className="w-[150px] px-4 md:px-6 py-2 rounded-3xl bg-[#FFCB74] text-white font-semibold active:scale-95 hover:bg-yellow-400 transition ">
                    view meal
                  </button>
                  </Link>
                  <button onClick={() => handleDelete(review._id)} className="w-[150px] px-4 md:px-6 py-2 rounded-3xl bg-[#c72828f2] text-white font-semibold active:scale-95 hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminAllReviews;
