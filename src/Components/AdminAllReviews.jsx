import React from "react";

const AdminAllReviews = () => {
  const reviews = [
    { id: 1, meal: "Spaghetti", likes: 12, reviewsCount: 30 },
    { id: 2, meal: "Burger", likes: 8, reviewsCount: 20 },
  ];
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto my-5 md:my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">All Reviews</h3>
      <table className="w-full md:min-w-[600px] border-collapse text-center">
        <thead>
          <tr className="bg-gray-100  text-gray-600 uppercase text-sm">
            <th className="p-3 md:p-4">Meal</th>
            <th className="p-3 md:p-4">Likes</th>
            <th className="p-3 md:p-4">Reviews</th>
            <th className="p-3 md:p-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="border-b hover:bg-gray-50">
              <td className="p-3 md:p-4">{review.meal}</td>
              <td className="p-3 md:p-4">{review.likes}</td>
              <td className="p-3 md:p-4">{review.reviewsCount}</td>
              <td className="p-3 md:p-4 flex flex-wrap flex-col md:flex-row gap-2 justify-center w-fit">
                <button className="w-[150px] px-4  md:px-6 py-2 rounded-3xl bg-[#FFCB74] text-white font-semibold active:scale-95 hover:bg-yellow-400 transition ">
                  view meal
                </button>
                <button className=" w-[150px] px-4  md:px-6 py-2 rounded-3xl bg-[#c72828f2] text-white font-semibold active:scale-95 hover:bg-red-600 transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminAllReviews;
