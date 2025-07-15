import React from 'react'

const AdminAllReviews = () => {
    const reviews = [
        { id: 1, meal: "Spaghetti", likes: 12, reviewsCount: 30 },
        { id: 2, meal: "Burger", likes: 8, reviewsCount: 20 },
      ];
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">All Reviews</h3>
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="p-4">Meal</th>
              <th className="p-4">Likes</th>
              <th className="p-4">Reviews</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{review.meal}</td>
                <td className="p-4">{review.likes}</td>
                <td className="p-4">{review.reviewsCount}</td>
                <td className="p-4 flex flex-wrap gap-2">
                  <button className="px-4 py-2 border border-black text-black outline outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition">Delete</button>
                  <button className="px-4 py-2 border border-black text-black outline outline-4 outline-offset-4 rounded-md hover:bg-black hover:text-white transition">View Meal</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

  )
}

export default AdminAllReviews