import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import axios from "axios";

const MealsScroll = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_LOAD = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [category, setCategory] = useState("All");

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append("search", searchTerm.trim());
    if (sortBy) params.append("sortBy", sortBy);
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (category && category !== "All") params.append("category", category.toLowerCase());
    return `?${params.toString()}`;
  };

  const fetchMeals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/meals${buildQuery()}`
      );
      setAllMeals(res.data);
      setItems(res.data.slice(0, ITEMS_PER_LOAD));
      setHasMore(res.data.length > ITEMS_PER_LOAD);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeals(); // re-fetch on sort or category change
  }, [sortBy, sortOrder, category]);

  const fetchMoreData = () => {
    const nextItems = allMeals.slice(
      items.length,
      items.length + ITEMS_PER_LOAD
    );
    setItems((prev) => [...prev, ...nextItems]);
    if (items.length + ITEMS_PER_LOAD >= allMeals.length) {
      setHasMore(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals();
  };

  return (
    <div className="w-full mx-auto mb-8">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl w-full md:text-5xl text-center font-bold">
          Search Meals
        </h2>

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

        {/* ✅ Sort & Category */}
        <div className="w-[90%] md:w-auto px-2 mt-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
            <span className="text-lg font-semibold">Sort & Filter:</span>

            {/* Sort Field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-sm font-medium">Field:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="category">Category</option> {/* ✅ Added */}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-sm font-medium">Order:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>

            {/* Filter Category */}
            {/* <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-sm font-medium">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="All">All</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div> */}
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <h4 className="text-center font-semibold">Loading more meals...</h4>
        }
        endMessage={
          <p className="text-center font-semibold mt-4">
            No more meals to show.
          </p>
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