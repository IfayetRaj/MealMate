import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const MealDetailPage = () => {
  // Dummy meal data
  const meal = {
    id: 1,
    title: "Deluxe Sushi Platter",
    image:
      "https://i.postimg.cc/HkpYSGM8/Screenshot-2025-07-15-at-5-35-17-PM.png",
    distributor: {
      name: "Chef Aiko",
    },
    description:
      "Experience authentic Japanese flavors with our deluxe sushi platter, featuring premium ingredients and chef’s special sauce.",
    ingredients: ["Salmon", "Tuna", "Rice", "Avocado", "Seaweed"],
    postTime: "2025-07-15T14:30:00Z",
    rating: 4.8,
    likes: 128,
  };

  const [likes, setLikes] = useState(meal.likes);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, user: "Alex", text: "Amazing taste! Will order again." },
    { id: 2, user: "Samira", text: "Very fresh and beautifully presented." },
  ]);

  const handleLike = () => {
    // Pretend this updates server too
    setLikes((prev) => prev + 1);
  };

  const handleRequestMeal = () => {
    console.log("Request meal logic here.");
    // POST request to save request
  };

  const handlePostReview = () => {
    if (!newReview.trim()) return;
    setReviews([
      ...reviews,
      { id: Date.now(), user: "You", text: newReview.trim() },
    ]);
    setNewReview("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Meal Image + Info */}
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
              By <span className="font-semibold">{meal.distributor.name}</span>
            </p>
            <p className="text-gray-700 mb-4">{meal.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-1">Ingredients:</h4>
              <ul className="flex flex-wrap gap-2">
                {meal.ingredients.map((ing) => (
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
              {new Date(meal.postTime).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.round(meal.rating)
                      ? "fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-700 font-medium">
                {meal.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleLike}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#FFCB74] rounded-full "
            >
              <FaHeart /> {likes} Like{likes !== 1 ? "s" : ""}
            </button>
            <button
              onClick={handleRequestMeal}
              className="flex-1 px-6 py-3 bg-black text-white border-2 border-black  outline-4 outline-offset-4 rounded-full active:scale-95 transition"
            >
              Request Meal
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mt-10">
  <h2 className="text-2xl md:text-3xl font-bold mb-6">
    Reviews ({reviews.length})
  </h2>

  {/* Write review box */}
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

  {/* Reviews list */}
  <div className="space-y-5">
    {reviews.map((r) => (
      <div
        key={r.id}
        className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl"
      >
        {/* Avatar */}
        <img
          src={`https://i.pravatar.cc/40?u=${r.id}`}
          alt={r.user}
          className="w-12 h-12 rounded-full object-cover shadow"
        />

        {/* Text block */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <p className="font-semibold text-gray-900">{r.user}</p>
            <span className="text-xs text-gray-500">
              {new Date().toLocaleDateString()}
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
