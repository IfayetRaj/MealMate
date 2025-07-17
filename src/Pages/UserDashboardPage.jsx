import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";

const UserDashboardPage = () => {
  const { userData, loading } = useContext(AuthContext);

  // getting requested meals based on my email from api
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  // getting data from api

  useEffect(() => {
    if (!userData?.email) {
      console.log("No user email yet");
      return;
    }
    const fetching = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/requests/${userData.email}`
        );
        setRequestedMeals(response.data);
      } catch (error) {
        console.error("Error fetching requested meals:", error);
        toast.error("Failed to fetch requested meals. Please try again later.");
      }
    };
    fetching();
  }, [userData?.email]);


  // handle cancel request
  const handleCancel = async (mealId) => {
    
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/requests/${mealId}`,
        {
          data: { email: userData.email },
        }
      );

      if (response.data.success) {
        setRequestedMeals((prevMeals) =>
          prevMeals.filter((meal) => meal._id !== mealId)
        );
        toast.success("Request cancelled successfully.");
      } else {
        toast.error("Failed to cancel request. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast.error("Failed to cancel request. Please try again later.");
    }
  }

// getting reviews from api
  useEffect(() => {
    if (!userData?.email) {
      console.log("No user email yet");
      return;
    }
    const fetching = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/user/${userData.email}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to fetch reviews. Please try again later.");
      }
    };
    fetching();
  }, [userData?.email]); 

// handeling delete
const handleDelete = async (id) =>{
  const confirmDelete = window.confirm("Are you sure you want to delete this review? This action cannot be undone.");
  if (confirmDelete) {
    // api
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`,
        {
          data: { email: userData.email },
        }
      );
      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== id)
      );
      toast.success("Review deleted successfully.");
      } else {
        toast.error("Failed to delete review. Please try again.");
      }
    }
    catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review. Please try again later.");
    }
  } else {
    toast.error("Review deletion cancelled.");
  }
}






  const payments = [
    {
      id: 1,
      date: "2025-07-15",
      amount: 25.5,
      status: "Completed",
      transactionId: "TXN123456",
    },
    {
      id: 2,
      date: "2025-06-30",
      amount: 15.0,
      status: "Completed",
      transactionId: "TXN654321",
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto p-4">
        <p>Could not load user data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8 py-10 md:pb-20">
      {/* My Profile */}
      <section className="relative bg-white shadow-lg my-5 md:my-8 rounded-2xl overflow-hidden mb-6">
        <div className="absolute top-0 left-0 w-full h-1/3 md:hidden bg-[#B38B59]"></div>

        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6">
          <img
            src={userData.photoURL}
            alt="User"
            className="w-30 h-30 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-white"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {userData.displayName}
            </h2>
            <p className="text-gray-600">{userData.email}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Badge: {userData.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Requested Meals */}
      <section className="bg-white shadow-lg my-5 md:my-8 rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Requested Meals</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 md:p-4">Title</th>
              <th className="p-3 md:p-4">Likes</th>
              <th className="p-3 md:p-4">Price</th>
              <th className="p-3 md:p-4">Status</th>
              <th className="p-3 md:p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(requestedMeals) && requestedMeals.length > 0 ? (
              requestedMeals.map((meal) => (
                <tr key={meal._id} className="border-b">
                  <td className="md:p-3 p-4">{meal.mealTitle || "No title"}</td>
                  <td className="md:p-3 p-4">{meal.mealLikes ?? "No likes"}</td>
                  <td className="md:p-3 p-4">{meal.mealPrice || "No status"}</td>
                  <td className="md:p-3 p-4">{meal.status || "No status"}</td>
                  <td className="md:p-3 p-4">
                    <button onClick={() => handleCancel(meal._id)} className="bg-black text-white px-4 py-2 rounded-xl active:scale-95 transition">Cancel</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* My Reviews */}
      <section className="bg-white shadow-lg my-5 md:my-8 rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">My Reviews</h3>
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="md:p-3 p-4">Title</th>
              <th className="md:p-3 p-4">Likes</th>
              <th className="md:p-3 p-4">Review</th>
              <th className="md:p-3 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b text-left">
                <td className="md:p-3 p-4">{review.title}</td>
                <td className="md:p-3 p-4">{review.likes}</td>
                <td className="md:p-3 p-4">{review.reviews}</td>
                <td className="md:p-3 p-4">
                  <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                    <button className="px-4 w-[30%] md:px-6 py-2 rounded-3xl bg-[#FFCB74] text-white font-semibold active:scale-95 hover:bg-yellow-400 transition">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(review._id)} className="px-4 w-[30%] md:px-6 py-2 rounded-3xl bg-[#c72828f2] text-white font-semibold active:scale-95 hover:bg-red-600 transition">
                      Delete
                    </button>
                    <Link to={`/meal-details/${review.mealId}`}  className="px-4 w-[30%] md:px-6 py-2 rounded-3xl border-2 bg-black text-white font-semibold border-black active:scale-95 hover:bg-gray-900 transition text-center">

                    <button>
                      View Meal
                    </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Payment History */}
      <section className="bg-white shadow-lg my-5 md:my-8 rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
        {payments.length > 0 ? (
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 md:p-3">Date</th>
                <th className="p-4 md:p-3">Amount</th>
                <th className="p-4 md:p-3">Status</th>
                <th className="p-4 md:p-3">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="p-4 md:p-3">{payment.date}</td>
                  <td className="p-4 md:p-3">${payment.amount}</td>
                  <td className="p-4 md:p-3">{payment.status}</td>
                  <td className="p-4 md:p-3">{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No payment history found.</p>
        )}
      </section>
    </div>
  );
};

export default UserDashboardPage;
