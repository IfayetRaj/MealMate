import React from "react";

const Card = () => {
  return (
    <div className="relative w-45 md:w-72 rounded-2xl overflow-hidden shadow-2xl outline-2 outline-black outline-offset-3 border-2 border-black text-white hover:-translate-y-1.5 transition-all duration-200">

      <img
        src="https://i.postimg.cc/h48wTMwz/Screenshot-2025-07-11-at-2-32-26-AM.png"
        alt="Beetroot Quinoa Salad"
        className="w-full h-70 md:h-96 object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-lg font-semibold leading-tight mb-2">
          Beetroot Quinoa Salad
        </h3>
        <p className="text-sm">Orange Ginger Dressing</p>

        <div className="flex gap-3 mt-3 text-sm text-gray-300">
          <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            30 mins
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            150k views
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
