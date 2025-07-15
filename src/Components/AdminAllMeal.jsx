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
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto my-5 md:my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">All Meals</h3>
      <p className="text-gray-500 mb-4 text-sm">
        Sorted by Likes & Reviews Count (server side)
      </p>
      <table className="w-full  min-w-[700px] md:min-w-[800px] text-left border-collapse">
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
              <td className="p-4 flex flex-wrap gap-2 flex-col md:flex-row">
                <button className=" w-[150px] px-4 md:px-6 py-2 rounded-3xl border-2 bg-black text-white font-semibold border-black active:scale-95">
                  Update
                </button>
                <button className="w-[150px] px-4  md:px-6 py-2 rounded-3xl bg-[#c72828f2] text-white font-semibold active:scale-95 hover:bg-red-600 transition">
                  Delete
                </button>
                <button className="w-[150px] px-4  md:px-6 py-2 rounded-3xl bg-[#FFCB74] text-white font-semibold active:scale-95 hover:bg-yellow-400 transition ">
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
