import React from 'react'

const AdminServeMeal = () => {
    const requestedMeals = [
        { id: 1, title: "Spaghetti", userEmail: "user1@example.com", userName: "UserOne", status: "Pending" },
      ];
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Serve Meals</h3>
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="p-4">Title</th>
              <th className="p-4">User Email</th>
              <th className="p-4">User Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals.map((meal) => (
              <tr key={meal.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{meal.title}</td>
                <td className="p-4">{meal.userEmail}</td>
                <td className="p-4">{meal.userName}</td>
                <td className="p-4">{meal.status}</td>
                <td className="p-4">
                  <button  className="px-4 py-2 border border-black text-black outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition">
                    Serve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  )
}

export default AdminServeMeal