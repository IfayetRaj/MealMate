import React from "react";

const AdminAllMeal = () => {
  const meals = [
    {
      id: 1,
      title: "Spaghetti",
      likes: 120,
      reviews: 30,
      rating: 4.5,
      distributor: "Admin Name",
    },
    {
      id: 2,
      title: "Burger",
      likes: 90,
      reviews: 20,
      rating: 4.2,
      distributor: "Admin Name",
    },
  ];

  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">All Meals</h3>
      <p className="text-gray-500 mb-4 text-sm">
        Sorted by Likes & Reviews Count (server side)
      </p>
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="p-4">Title</th>
            <th className="p-4">Likes</th>
            <th className="p-4">Reviews</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Distributor</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{meal.title}</td>
              <td className="p-4">{meal.likes}</td>
              <td className="p-4">{meal.reviews}</td>
              <td className="p-4">{meal.rating}</td>
              <td className="p-4">{meal.distributor}</td>
              <td className="p-4 flex flex-wrap gap-2">
                <button className="px-4 py-2 border border-black text-black outline outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition">
                  Update
                </button>
                <button className="px-4 py-2 border border-black text-black outline outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition">
                  Delete
                </button>
                <button className="px-4 py-2 border border-black text-black outline outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition">
                  View Meal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminAllMeal;
