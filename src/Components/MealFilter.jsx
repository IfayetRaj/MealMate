import React, { useState } from "react";

const MealFilter = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      category,
      minPrice: minPrice !== "" ? Number(minPrice) : null,
      maxPrice: maxPrice !== "" ? Number(maxPrice) : null,
    });
    setIsOpen(false); // optional: close filter after applying
  };

  return (
    <div className="w-full mx-auto mb-8">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-8 py-4 md:py-3 bg-black text-white font-semibold md:rounded-md w-[90%] md:w-[35%] mx-auto block hover:bg-gray-800 transition text-base md:text-sm"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Collapsible Panel */}
      {isOpen && (
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Filter Meals</h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row md:items-end gap-4"
          >
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="All">All</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Min Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g. 5"
                min="0"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g. 20"
                min="0"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-4 md:py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition text-base md:text-sm"
            >
              Apply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MealFilter;