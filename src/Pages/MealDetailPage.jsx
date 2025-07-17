import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const MealDetailPage = () => {
  const { id } = useParams();
  const { userData } = useContext(AuthContext);
  const [meal, setMeal] = useState(null);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  // here
  const [requested, setRequested] = useState(false);

  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const user = {
    userId: userData?._id,
    displayName: userData?.displayName,
    email: userData?.email,
    image: userData?.photoURL,
  };

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/meals/${id}`
        );
        setMeal(res.data);
        setLikes(res.data.likes || 0);
      } catch (err) {
        console.error("Failed to fetch meal:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchMeal();
    fetchReviews();
  }, [id, user.email]);

  const handleLikeToggle = async () => {
    const action = liked ? "dislike" : "like";
  
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/meals/${id}/like`,
        { action }
      );
  
      setLikes((prev) => prev + (action === "like" ? 1 : -1));
      setLiked(!liked);
  
      if (res.data.released) {
        toast.success("🎉 This upcoming meal has been released!");
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
      if (err.response?.data?.error) {
        toast.error(`Error: ${err.response.data.error}`);
      } else {
        toast.error("Failed to update like. Please try again.");
      }
    }
  };

  // this one-----------------------------------------------------
  const handleRequestMeal = async () => {
    const data = {
      userName: userData.displayName,
      userEmail: userData.email,
      mealId: meal._id,
      mealTitle: meal.title,
      mealLikes: meal.likes,
      mealPrice: meal.price,
      status: "pending",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/request-meal`,
        data
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        setRequested(true);
        toast.success("Meal requested successfully");
      } else {
        toast.error("You have already requested this meal.");
      }
    } catch (error) {
      console.error("Error requesting meal:", error);
      toast.error("Something went wrong while requesting the meal.");
    }
  };

  const handlePostReview = async () => {
    if (!newReview.trim()) return;

    const reviewData = {
      mealId: id,
      displayName: user.displayName,
      title: meal.title,
      likes: meal.likes,
      reviews: meal.reviews || 0,
      email: user.email,
      image: user.image,
      text: newReview.trim(),
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`,
        reviewData
      );
      setReviews([
        { ...reviewData, date: new Date().toISOString() },
        ...reviews,
      ]);
      setNewReview("");
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };

  if (!meal) {
    return <div className="text-center py-20">Loading meal...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-3xl shadow overflow-hidden">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full md:w-1/2 h-80 object-cover"
        />
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {meal.title}
            </h1>
            <p className="text-gray-500 mb-2">
              By <span className="font-semibold">{meal.distributorName}</span>
            </p>
            <p className="text-gray-700 mb-4">{meal.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-1">Ingredients:</h4>
              <ul className="flex flex-wrap gap-2">
                {Array.isArray(meal.ingredients) &&
                  meal.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {ing}
                    </li>
                  ))}
              </ul>
            </div>

            <p className="text-gray-500 text-sm mb-2">
              Posted on:{" "}
              {new Date(meal.date || meal.postTime).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.round(meal.rating || 0)
                      ? "fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-700 font-medium">
                {(meal.rating || 0).toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {meal.status === "upcoming" && userData.badge === "bronze" ? (
              <p className="inline-block bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow">
                ⚠️ Upgrade your badge to like this upcoming meal!
              </p>
            ) : (
              <button
                onClick={handleLikeToggle}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                  liked
                    ? "border-red-500 text-red-600 hover:bg-red-50"
                    : "border-yellow-400 text-gray-800 hover:bg-yellow-50"
                }`}
              >
                <FaHeart className="text-xl" />
                <span className="font-semibold">
                  {likes} {liked ? "Liked" : "Like"}
                </span>
              </button>
            )}

            {meal.status === "upcoming" ? (
              <button
                className="flex-1 px-6 py-3 bg-red-600 text-white border-2 rounded-full"
                disabled
              >
                Upcoming
              </button>
            ) : (
              <button
                onClick={handleRequestMeal}
                className={`flex-1 px-6 py-3 ${
                  requested ? "bg-yellow-500" : "bg-black"
                } text-white border-2 border-black rounded-full`}
              >
                {requested ? "Requested" : "Request Meal"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Reviews ({reviews.length})
        </h2>
        <div className="mb-8">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none transition"
            rows={4}
          />
          <button
            onClick={handlePostReview}
            className="mt-4 px-6 py-3 bg-black text-white border-2 border-black rounded-md md:rounded-full w-full md:w-fit hover:bg-gray-900 transition active:scale-95"
          >
            Post Review
          </button>
        </div>
        <div className="space-y-5">
          {reviews.map((r, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl"
            >
              <img
                src={r.image}
                alt={r.displayName}
                className="w-12 h-12 rounded-full object-cover shadow"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <p className="font-semibold text-gray-900">{r.displayName}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-2 leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealDetailPage;
