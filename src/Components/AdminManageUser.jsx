import React from 'react'

const AdminManageUser = () => {
    const users = [
        { id: 1, username: "UserOne", email: "user1@example.com", isAdmin: false, subscription: "Active" },
        { id: 2, username: "UserTwo", email: "user2@example.com", isAdmin: true, subscription: "Inactive" },
      ];
    
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h3>
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Make Admin</th>
              <th className="p-4">Subscription</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {!user.isAdmin && (
                    <button className="px-4 py-2 border border-black text-black outline outline-4 outline-offset-4 hover:bg-black hover:text-white transition rounded-md">
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="p-4">{user.subscription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  )
}

export default AdminManageUser