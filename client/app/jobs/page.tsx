"use client";
import React, { useState } from "react";
import { FaSun, FaMoon, FaSearch, FaCalendarAlt } from "react-icons/fa";

interface Job {
  id: string;
  title: string;
  description: string;
  date: string; // added job posted date
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "React, Tailwind, JS",
    date: "2025-08-20",
  },
  {
    id: "2",
    title: "Backend Developer",
    description: "Node.js, Express, Prisma",
    date: "2025-08-19",
  },
  {
    id: "3",
    title: "Fullstack Developer",
    description: "React + Node.js",
    date: "2025-08-18",
  },
  {
    id: "4",
    title: "Fullstack Developer",
    description: "React + Node.js",
    date: "2025-08-17",
  },
];

const HomeDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen transition-colors duration-300 flex`}
    >
      {/* Filters Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-300">
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E40AF" }}>
          Filters
        </h3>
        <div className="mb-4 relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2"
            style={{ borderColor: "#1E40AF", focus: { ringColor: "#1E40AF" } }}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Role</label>
          <select
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: "#1E40AF" }}
          >
            <option value="">All</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
        </div>
        {/* Add more filters as needed */}
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-gray-300">
          <div className="text-2xl font-bold" style={{ color: "#1E40AF" }}>
            TalentHub
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="rounded-full w-10 h-10"
              />
              <span className="font-medium">Elkan</span>
            </div>
          </div>
        </header>

        {/* Jobs */}
        <main className="p-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#1E40AF" }}
          >
            Jobs Listed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs
              .filter((job) =>
                job.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((job) => (
                <div
                  key={job.id}
                  className="p-4 border rounded-md shadow hover:shadow-lg transition-shadow duration-200"
                  style={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    borderColor: "#E5E7EB",
                  }}
                >
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: "#1E40AF" }}
                  >
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <FaCalendarAlt /> <span>{job.date}</span>
                  </div>
                  <button
                    className="mt-3 px-3 py-1 rounded transition-colors"
                    style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
                  >
                    Apply
                  </button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeDashboard;
