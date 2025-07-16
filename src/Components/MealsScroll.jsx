import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import axios from "axios";

const MealsScroll = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_LOAD = 6;

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append("search", searchTerm.trim());
    if (category && category !== "All") params.append("category", category.toLowerCase());
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    return `?${params.toString()}`;
  };

  const fetchMeals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals${buildQuery()}`);
      setAllMeals(res.data);
      setItems(res.data.slice(0, ITEMS_PER_LOAD));
      setHasMore(res.data.length > ITEMS_PER_LOAD);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeals(); // initial load
  }, []);

  const fetchMoreData = () => {
    const nextItems = allMeals.slice(items.length, items.length + ITEMS_PER_LOAD);
    setItems((prev) => [...prev, ...nextItems]);
    if (items.length + ITEMS_PER_LOAD >= allMeals.length) {
      setHasMore(false);
    }
  };

  // ✅ Handles search **AND** filters together
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMeals();
    setIsOpen(false);
  };

  return (
    <div className="w-full mx-auto mb-8">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl w-full md:text-5xl text-center font-bold">Search Meals</h2>

        {/* ✅ Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-row items-center mt-8 gap-4 w-[90%] md:w-auto px-2"
        >
          <input
            type="text"
            placeholder="Search by meal name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-4 text-base md:text-sm rounded-full border border-gray-300 w-full md:w-96 focus:outline-none"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition text-base md:text-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* ✅ Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-8 py-4 md:py-3 bg-black text-white font-semibold md:rounded-md w-[90%] md:w-[35%] mx-auto block hover:bg-gray-800 transition text-base md:text-sm mt-6"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {isOpen && (
        <div className="bg-white shadow rounded-xl p-4 w-[90%] md:w-[50%] mx-auto mt-4">
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

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center font-semibold">Loading more meals...</h4>}
        endMessage={
          <p className="text-center font-semibold mt-4">No more meals to show.</p>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-7 w-[90%] md:w-[75%] mt-9 mx-auto">
          {items.map((meal) => (
            <Card key={meal._id} meal={meal} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MealsScroll;