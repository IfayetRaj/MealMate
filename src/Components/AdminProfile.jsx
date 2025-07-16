import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AdminProfile = () => {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return <p>Loading profile...</p>; // fallback
  }

  return (
    <section className="relative bg-white rounded-3xl shadow-lg overflow-hidden my-5 md:my-8 mx-3 md:mx-0">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-black md:hidden"></div>

      <div className="relative flex flex-col md:flex-row items-center gap-8 p-8">
        <img
          src={userData.photoURL}
          alt="Admin"
          className="w-30 h-30 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-white"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{userData.displayName}</h2>
          <p className="text-gray-500">{userData.email}</p>
          <p className="mt-2 text-lg text-gray-700">
            Meals Added:{" "}
            <span className="font-semibold">{userData.mealsAdded}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
export default AdminProfile;
