import React from 'react'

const AdminProfile = () => {
    const admin = {
        name: "Admin Name",
        email: "admin@example.com",
        image: "https://via.placeholder.com/100",
        mealsAdded: 25,
      };
    
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://i.postimg.cc/mgR5W8X9/Screenshot-2025-07-15-at-3-21-41-PM.png"
          alt="Admin"
          className="w-28 h-28 rounded-full object-cover shadow"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{admin.name}</h2>
          <p className="text-gray-500">{admin.email}</p>
          <p className="mt-2 text-lg text-gray-700">Meals Added: <span className="font-semibold">{admin.mealsAdded}</span></p>
        </div>
      </section>
  )
}

export default AdminProfile