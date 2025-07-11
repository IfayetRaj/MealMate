import React from 'react'
import MealFilter from './MealFilter'

const MealSearchBar = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl w-full md:text-5xl text-center font-bold">
          Search Meals
        </h2>

        {/* Search Bar */}
        <div className="flex flex-row items-center mt-8 gap-4 w-[90%] md:w-auto px-2">
          <input
            type="text"
            placeholder="Search by meal name"
            className="px-5 py-4 text-base md:text-sm rounded-full border border-gray-300 w-full md:w-96 focus:outline-none"
          />
          <button className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition text-base md:text-sm">
            Search
          </button>
        </div>

        {/* Filter (below search bar) */}
        <div className="w-full mt-6">
        </div>
      </div>
    </div>
  )
}

export default MealSearchBar