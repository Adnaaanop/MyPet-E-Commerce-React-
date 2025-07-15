import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const USERS_PER_PAGE = 6;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  Filter 
  useEffect(() => {
    let filtered = [...users];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (user) => (user.status || "active") === statusFilter
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset 
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "blocked" ? "active" : "blocked";
    try {
      await axios.patch(`${BASE_URL}/users/${user.id}`, {
        status: newStatus,
      });
      fetchUsers(); 
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  //  Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/*  Search + Filters + Clear */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <button
          onClick={handleClearFilters}
          className="text-sm px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
        >
          Clear Filters
        </button>
      </div>

      {/* Users List */}
      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users match your filters.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg shadow-md p-4 bg-white transition-all duration-200 hover:shadow-lg"
              >
                <div className="space-y-1 text-sm">
                  <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>ID:</strong> {user.id}
                  </p>

                  {/* Role badge */}
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>

                  {/* Status badge */}
                  <span
                    className={`inline-block ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                      (user.status || "active") === "blocked"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {(user.status || "active") === "blocked" ? "Blocked" : "Active"}
                  </span>
                </div>

                {/* Action Button */}
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleToggleStatus(user)}
                    className={`text-xs px-3 py-1 rounded font-medium shadow-sm transition-colors duration-150 ${
                      (user.status || "active") === "blocked"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {(user.status || "active") === "blocked" ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/*  Pagination  */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-2 py-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
