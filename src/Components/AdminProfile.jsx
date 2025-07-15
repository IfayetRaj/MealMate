import React from "react";

const AdminProfile = () => {
  const admin = {
    name: "Admin Name",
    email: "admin@example.com",
    image: "https://via.placeholder.com/100",
    mealsAdded: 25,
  };

  return (
    <section className="relative bg-white rounded-3xl shadow-lg overflow-hidden my-5 md:my-8 mx-3 md:mx-0">
      {/* Black cover strip inside */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-black md:hidden"></div>

      {/* Content container */}
      <div className="relative flex flex-col md:flex-row items-center gap-8 p-8">
        <img
          src="https://i.postimg.cc/mgR5W8X9/Screenshot-2025-07-15-at-3-21-41-PM.png"
          alt="Admin"
          className="w-30 h-30 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-white"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{admin.name}</h2>
          <p className="text-gray-500">{admin.email}</p>
          <p className="mt-2 text-lg text-gray-700">
            Meals Added:{" "}
            <span className="font-semibold">{admin.mealsAdded}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
