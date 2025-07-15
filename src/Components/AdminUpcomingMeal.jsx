import React, { useState } from 'react';
import AddMeal from './AddMeal'; // ✅ reuse the AddMeal component if you have it

const AdminUpcomingMeal = () => {
  const [showModal, setShowModal] = useState(false);

  const upcomingMeals = [
    { id: 1, title: "Special Pizza", likes: 50 },
  ];

  const handleAddUpcomingMeal = (data) => {
    console.log("Upcoming Meal Added:", data);
    // TODO: Send to your backend
    setShowModal(false);
  };

  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h3 className="text-2xl font-bold text-gray-800">Upcoming Meals</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 border border-black text-black outline outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition"
        >
          Add Upcoming Meal
        </button>
      </div>

      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="p-4">Title</th>
            <th className="p-4">Likes</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {upcomingMeals.map((meal) => (
            <tr key={meal.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{meal.title}</td>
              <td className="p-4">{meal.likes}</td>
              <td className="p-4">
                <button className="px-4 py-2 border border-black text-black  outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition">
                  Publish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Upcoming Meal</h3>
            <AddMeal
              adminName="Admin Name"
              adminEmail="admin@example.com"
              onSubmit={handleAddUpcomingMeal}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminUpcomingMeal;