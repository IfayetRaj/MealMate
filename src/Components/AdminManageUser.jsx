import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const AdminManageUser = () => {
  const { userData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/recent/${userData.email}`
        );
        setUsers(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users");
      }
    };
    if (userData?.email) {
      fetchUsers();
    }
  }, [userData?.email]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchEmail) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/search?email=${encodeURIComponent(
          searchEmail
        )}`
      );
      setUsers(res.data);
      setCurrentPage(1); 
    } catch (error) {
      console.error(error);
      toast.error("User not found"); 
    }
  };


  const handleRoleToggle = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/role`, {
        role: newRole,
      });
      toast.success(`Role updated to ${newRole}`);
      // Refresh the list
      if (searchEmail) {
        handleSearch({ preventDefault: () => {} });
      } else {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/recent/${userData.email}`
        );
        setUsers(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="bg-white rounded-3xl shadow-lg my-5 md:my-8 p-8 overflow-x-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h3>

      <form onSubmit={handleSearch} className="mb-4 flex gap-4">
        <input
          type="email"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border p-3 rounded-xl w-full md:w-1/3"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-xl border-2 border-black"
        >
          Search
        </button>
      </form>

      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="p-3 md:p-4">Username</th>
            <th className="p-3 md:p-4">Email</th>
            <th className="p-3 md:p-4">Role</th>
            <th className="p-3 md:p-4">Subscription</th>
            <th className="p-3 md:p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="p-3 md:p-4">{user.displayName}</td>
              <td className="p-3 md:p-4">{user.email}</td>
              <td className="p-3 md:p-4">{user.role}</td>
              <td className="p-3 md:p-4">{user.subscription || "None"}</td>
              <td className="p-3 md:p-4">
                <button
                  onClick={() => handleRoleToggle(user._id, user.role)}
                  className="w-[150px] px-4 md:px-6 py-2 rounded-3xl border-2 bg-black text-white font-semibold border-black active:scale-95"
                >
                  {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Prev
        </button>

        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AdminManageUser;