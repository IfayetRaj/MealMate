import React from 'react'

const MealSearchBar = () => {
  return (
    <div className='py-5'>
        <div className="flex items-center flex-col">
            <h2 className="text-4xl w-full md:text-5xl text-center font-bold">Search Meals</h2>
            <div className="flex flex-row mt-8 gap-4 w-full md:w-auto px-2">
        <input
          type="text"
          placeholder="Enter your email"
          className="px-5 py-4 text-base md:text-sm rounded-full border border-gray-300 w-full md:w-96 focus:outline-none"
        />
        <button className="px-8 py-4 md:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition text-base md:text-sm">
        Search
        </button>
      </div>
        </div>
    </div>
  )
}

export default MealSearchBar