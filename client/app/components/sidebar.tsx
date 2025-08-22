"use client";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface SidebarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedRoles: string[];
  toggleRole: (role: string) => void;
}

const Sidebar = ({
  search,
  setSearch,
  selectedRoles,
  toggleRole,
}: SidebarProps) => {
  return (
    <aside className="w-64 p-6 border-r border-gray-300 h-screen mr-24 fixed">
      <h3 className="text-lg font-bold mb-4" style={{ color: "#1E40AF" }}>
        Filters
      </h3>

      {/* Search */}
      <div className="mb-6 relative">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-3 py-2 border-none rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
      </div>

      {/* Role Checkboxes */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Role</label>
        <div className="flex flex-col gap-2">
          {["frontend", "backend", "fullstack"].map((role) => (
            <label
              key={role}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => toggleRole(role)}
                className="accent-blue-800"
              />
              <span className="font-extrabold text-blue-800">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-72 flex text-center items-center justify-center">
        <button
          className="px-4 py-3 text-white rounded"
          style={{ backgroundColor: "#10B981" }}
        >
          My Applications
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
