import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";

const UserDashboardPage = () => {
  const { userData, loading } = useContext(AuthContext);

  const [requestedMeals, setRequestedMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Requested Meals Pagination
  const [reqCurrentPage, setReqCurrentPage] = useState(1);
  const reqPerPage = 5;

  // Reviews Pagination
  const [revCurrentPage, setRevCurrentPage] = useState(1);
  const revPerPage = 5;

  // Payments Pagination
  const [payCurrentPage, setPayCurrentPage] = useState(1);
  const payPerPage = 5;

  useEffect(() => {
    if (!userData?.email) return;
    const fetchRequestedMeals = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/requests/${userData.email}`
        );
        setRequestedMeals(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch requested meals.");
      }
    };
    fetchRequestedMeals();
  }, [userData?.email]);

  const handleCancel = async (mealId) => {
    console.log(mealId)
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/requests/${mealId}`,
        { data: { email: userData.email } }
      );
      if (res.data.success) {
        setRequestedMeals((prev) => prev.filter((meal) => meal._id !== mealId));
        toast.success("Request cancelled.");
      } else {
        toast.error("Failed to cancel.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Cancel failed.");
    }
  };

  useEffect(() => {
    if (!userData?.email) return;
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/user/${userData.email}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch reviews.");
      }
    };
    fetchReviews();
  }, [userData?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`,
        {
          data: { email: userData.email },
        }
      );
      if (res.data.success) {
        setReviews((prev) => prev.filter((review) => review._id !== id));
        toast.success("Review deleted.");
      } else {
        toast.error("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    }
  };
  

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetching = async() =>{
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/payments/${userData.email}`);
        setPayments(res.data);
      }
      catch(err){
        console.error(err);
        // toast.error("Failed to fetch payment history.");
      }
    }
    fetching();
  }, []);



 

  if (loading) return <p className="p-4">Loading...</p>;
  if (!userData) return <p className="p-4">Could not load user data.</p>;

  // Requested Meals: slice
  const reqTotalPages = Math.ceil(requestedMeals.length / reqPerPage);
  const reqData = requestedMeals.slice(
    (reqCurrentPage - 1) * reqPerPage,
    reqCurrentPage * reqPerPage
  );

  // Reviews: slice
  const revTotalPages = Math.ceil(reviews.length / revPerPage);
  const revData = reviews.slice(
    (revCurrentPage - 1) * revPerPage,
    revCurrentPage * revPerPage
  );

  // Payments: slice
  const payTotalPages = Math.ceil(payments.length / payPerPage);
  const payData = payments.slice(
    (payCurrentPage - 1) * payPerPage,
    payCurrentPage * payPerPage
  );

  return (
    <div className="container mx-auto p-4 space-y-8 py-10 md:pb-20 ">
      {/* Profile */}
      <section className="relative bg-white rounded-3xl shadow-lg overflow-hidden my-5 md:my-8 mx-3 md:mx-0 py-8 md:p-9">
      <div className="absolute top-0 left-0 z-0 w-full h-1/3 bg-black md:hidden"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-6 z-10 text-center md:text-left">
          <img
            src={userData.photoURL}
            alt="User"
            className="w-28 h-28 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{userData.displayName}</h2>
            <p>{userData.email}</p>
            <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Badge: {userData.badge}
            </span>
          </div>
        </div>
      </section>

      {/* Requested Meals */}
      <section className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Requested Meals</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Title</th>
              <th className="p-3">Likes</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reqData.map((meal) => (
              <tr key={meal._id} className="border-b">
                <td className="p-3">{meal.mealTitle}</td>
                <td className="p-3">{meal.mealLikes}</td>
                <td className="p-3">{meal.mealPrice}</td>
                <td className="p-3">{meal.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleCancel(meal._id)}
                    className="bg-black text-white px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setReqCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={reqCurrentPage === 1}
            className={`px-4 py-2 rounded-full ${
              reqCurrentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-black text-white"
            }`}
          >
            Prev
          </button>
          <p>
            Page {reqCurrentPage} of {reqTotalPages}
          </p>
          <button
            onClick={() =>
              setReqCurrentPage((p) => Math.min(p + 1, reqTotalPages))
            }
            disabled={reqCurrentPage === reqTotalPages}
            className={`px-4 py-2 rounded-full ${
              reqCurrentPage === reqTotalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-black text-white"
            }`}
          >
            Next
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-xl font-bold mb-6 text-gray-800">My Reviews</h3>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="p-4">Title</th>
              <th className="p-4">Likes</th>
              <th className="p-4">Review</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {revData.length ? (
              revData.map((review) => (
                <tr
                  key={review._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">{review.title}</td>
                  <td className="p-4">{review.likes}</td>
                  <td className="p-4">{review.reviews}</td>
                  <td className="p-4">
                    <div className="flex flex-col md:flex-row flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium transition">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/meal-details/${review.mealId}`}
                        className="px-4 py-2 rounded-full bg-black hover:bg-gray-900 text-white text-sm font-medium transition text-center"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setRevCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={revCurrentPage === 1}
            className={`px-6 py-2 rounded-full border ${
              revCurrentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            } transition`}
          >
            Prev
          </button>

          <p className="text-sm text-gray-700">
            Page <span className="font-semibold">{revCurrentPage}</span> of{" "}
            <span className="font-semibold">{revTotalPages}</span>
          </p>

          <button
            onClick={() =>
              setRevCurrentPage((p) => Math.min(p + 1, revTotalPages))
            }
            disabled={revCurrentPage === revTotalPages}
            className={`px-6 py-2 rounded-full border ${
              revCurrentPage === revTotalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            } transition`}
          >
            Next
          </button>
        </div>
      </section>

      {/* Payments */}
      <section className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payData.map((pay) => (
              <tr key={pay.id} className="border-b">
                <td className="p-3">{new Date(pay.date).toISOString().split("T")[0]}</td>
                <td className="p-3">৳{pay.amount/100}</td>
                <td className="p-3">{pay.status}</td>
                <td className="p-3">{pay.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPayCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={payCurrentPage === 1}
            className={`px-4 py-2 rounded-full ${
              payCurrentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-black text-white"
            }`}
          >
            Prev
          </button>
          <p>
            Page {payCurrentPage} of {payTotalPages}
          </p>
          <button
            onClick={() =>
              setPayCurrentPage((p) => Math.min(p + 1, payTotalPages))
            }
            disabled={payCurrentPage === payTotalPages}
            className={`px-4 py-2 rounded-full ${
              payCurrentPage === payTotalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-black text-white"
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserDashboardPage;
