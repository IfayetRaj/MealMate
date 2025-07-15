import React from 'react'

const AdminAddMeal = () => {
    const admin = {
        name: "Admin Name",
        email: "admin@example.com",
        image: "https://via.placeholder.com/120",
        mealsAdded: 25,
      };
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 my-5 md:my-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Meal</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Title" className="border p-3 rounded-xl focus:ring-2 ring-black" />
          <input type="text" placeholder="Category" className="border p-3 rounded-xl focus:ring-2 ring-black" />
          <input type="file" placeholder="Image" className="border p-3 rounded-xl focus:ring-2 ring-black" />
          <input type="text" placeholder="Ingredients" className="border p-3 rounded-xl focus:ring-2 ring-black" />
          <textarea placeholder="Description" className="border p-3 rounded-xl md:col-span-2 focus:ring-2 ring-black"></textarea>
          <input type="number" placeholder="Price" className="border p-3 rounded-xl focus:ring-2 ring-black" />
          <input type="datetime-local" className="border p-3 rounded-xl focus:ring-2 ring-black" />
          <input type="text" value={admin.name} readOnly className="border p-3 rounded-xl bg-gray-100 text-gray-500" />
          <input type="text" value={admin.email} readOnly className="border p-3 rounded-xl bg-gray-100 text-gray-500" />
          <button className="px-6 py-3 bg-black text-white border-2 border-black  outline-4 outline-offset-4 rounded-xl hover:bg-gray-800 transition md:col-span-2">
            Add Meal
          </button>
        </form>
      </section>
  )
}

export default AdminAddMeal