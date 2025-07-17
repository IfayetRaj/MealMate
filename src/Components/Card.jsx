import React from "react";
import { Link } from "react-router";
import { CiHeart } from "react-icons/ci";

const Card = ({ meal }) => {
  if (!meal) {
    return <div className="text-red-500">No meal data</div>;
  }

  const { image, title, description,price, likes, } = meal;

  return (
    <Link to={`/meal-details/${meal._id}`}>
      <div className="relative w-42 mx-auto md:w-78 rounded-2xl overflow-hidden shadow-2xl outline-2 outline-black outline-offset-3 border-2 border-black text-white hover:-translate-y-1.5 transition-all duration-200">
        {image ? (
          <img
            src={image}
            alt={title || "Meal image"}
            className="w-full h-72 md:h-98 object-cover"
          />
        ) : (
          <div className="w-full h-72 md:h-98 bg-gray-200 flex items-center justify-center text-black">
            No Image
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-lg font-semibold leading-tight mb-2">
            {title || "Untitled Meal"}
          </h3>
          <p className="text-sm">{description || "No description provided."}</p>

          <div className="gap-3 mt-3 text-sm text-gray-300 flex flex-col md:flex-row">
            <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              Price: {price}
            </span>

            
            <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <CiHeart className="inline-block mr-2" size={20}/>{likes || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
