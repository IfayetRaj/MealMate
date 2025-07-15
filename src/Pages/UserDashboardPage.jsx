import React from "react";

const UserDashboardPage = () => {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    image: "https://via.placeholder.com/100",
    badges: ["Bronze"],
  };

  // Dummy payments data
  const payments = [
    {
      id: 1,
      date: "2025-07-15",
      amount: 25.5,
      status: "Completed",
      transactionId: "TXN123456",
    },
    {
      id: 2,
      date: "2025-06-30",
      amount: 15.0,
      status: "Completed",
      transactionId: "TXN654321",
    },
  ];

  // Dummy requested meals data
  const requestedMeals = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      likes: 120,
      reviewsCount: 35,
      status: "Pending",
    },
    {
      id: 2,
      title: "Chicken Curry",
      likes: 90,
      reviewsCount: 20,
      status: "Approved",
    },
  ];

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      likes: 15,
      review: "Delicious and hearty!",
    },
    {
      id: 2,
      title: "Chicken Curry",
      likes: 10,
      review: "Loved the spices.",
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-8 py-10 md:pb-20">
      {/* My Profile */}
      <section className="relative bg-white shadow-lg my-5 md:my-8  rounded-2xl  overflow-hidden mb-6">
        {/* Black cover inside the card */}
        <div className="absolute top-0 left-0 w-full h-1/3 md:hidden bg-[#B38B59]"></div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6">
        <img
          src="https://i.postimg.cc/mgR5W8X9/Screenshot-2025-07-15-at-3-21-41-PM.png"
          alt="Admin"
          className="w-30 h-30 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-white"
        />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              {user.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requested Meals */}
      <section className="bg-white shadow-lg my-5 md:my-8  rounded-2xl  p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Requested Meals</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="p-3 md:p-4">Title</th>
              <th className="p-3 md:p-4">Likes</th>
              <th className="p-3 md:p-4">Reviews</th>
              <th className="p-3 md:p-4">Status</th>
              <th className="p-3 md:p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals.map((meal) => (
              <tr key={meal.id} className="border-b">
                <td className="p-3 md:p-4">{meal.title}</td>
                <td className="p-3 md:p-4">{meal.likes}</td>
                <td className="p-3 md:p-4">{meal.reviewsCount}</td>
                <td className="p-3 md:p-4">{meal.status}</td>
                <td className="p-3 md:p-4">
                  <button className="px-4 md:px-6 py-2 rounded-3xl border-2 bg-black text-white font-semibold border-black active:scale-95">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* My Reviews */}
      <section className="bg-white shadow-lg my-5 md:my-8  rounded-2xl  p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">My Reviews</h3>
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="md:p-3 p-4">Title</th>
              <th className="md:p-3 p-4">Likes</th>
              <th className="md:p-3 p-4">Review</th>
              <th className="md:p-3 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b text-left">
                <td className="md:p-3 p-4">{review.title}</td>
                <td className="md:p-3 p-4">{review.likes}</td>
                <td className="md:p-3 p-4">{review.review}</td>
                <td className="md:p-3 p-4">
                  <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                    <button className="px-4 w-full md:px-6 py-2 rounded-3xl bg-[#FFCB74] text-white font-semibold active:scale-95 hover:bg-yellow-400 transition">
                      Edit
                    </button>
                    <button className="px-4 w-full md:px-6 py-2 rounded-3xl bg-[#c72828f2] text-white font-semibold active:scale-95 hover:bg-red-600 transition">
                      Delete
                    </button>
                    <button className="px-4 w-full md:px-6 py-2 rounded-3xl border-2 bg-black text-white font-semibold border-black active:scale-95 hover:bg-gray-900 transition">
                      View Meal
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Payment History */}
      <section className="bg-white shadow-lg my-5 md:my-8  rounded-2xl  p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
        {payments.length > 0 ? (
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="p-4 md:p-3">Date</th>
                <th className="p-4 md:p-3">Amount</th>
                <th className="p-4 md:p-3">Status</th>
                <th className="p-4 md:p-3">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="p-4 md:p-3">{payment.date}</td>
                  <td className="p-4 md:p-3">${payment.amount}</td>
                  <td className="p-4 md:p-3">{payment.status}</td>
                  <td className="p-4 md:p-3">{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No payment history found.</p>
        )}
      </section>
    </div>
  );
};

export default UserDashboardPage;
