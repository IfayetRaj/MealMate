import React from "react";

const Banner = () => {
  return (
    <section className="flex py-32 md:py-40 flex-col justify-center items-center text-center px-4 bg-white relative overflow-hidden md:px-20">
      {/* Background accents (optional) */}
      <div className="absolute top-10 left-10 w-8 h-8 rounded-full border-2 border-black animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full border-2 border-black animate-pulse"></div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold flex flex-wrap items-center justify-center gap-4">
        <span>Manage</span>
        <img
          src="https://i.postimg.cc/LsnbLDpf/Screenshot-2025-07-11-at-1-56-14-AM.png"
          alt="seminar"
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full"
        />
        <span>meals</span>
        <br className="hidden md:block" />
        <span>healthy foods</span>
        <span className="flex items-center gap-2">
          <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400 flex items-center justify-center">
            🥢
          </span>
          <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-300 flex items-center justify-center text-black font-bold">
            &
          </span>
        </span>
        <span>reviews</span>
        <img
          src="https://i.postimg.cc/Y2fb4ZWZ/Screenshot-2025-07-11-at-1-57-19-AM.png"
          alt="trainer"
          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full"
        />
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 mt-6 max-w-xl px-2">
        Simplify hostel life with smart meal plans, easy reviews, and better food
        experiences for every student — all in one place!
      </p>

      {/* Email input */}
      <div className="flex flex-col md:flex-row mt-8 gap-4 w-full md:w-auto px-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 py-4 text-base md:text-sm rounded-full border border-gray-300 w-full md:w-96 focus:outline-none"
        />
        <button className="px-8 py-4 md:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition text-base md:text-sm">
          Send
        </button>
      </div>

      {/* Floating tag */}
      <div className="absolute bottom-16 right-6 md:bottom-20 md:right-10 bg-black text-white px-4 py-2 rounded-full shadow-lg">
        Management
      </div>
    </section>
  );
};

export default Banner;