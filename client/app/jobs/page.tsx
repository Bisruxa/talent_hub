'use client'
import React, { useState } from "react";

interface Job {
  id: string;
  title: string;
  description: string;
}

const mockJobs: Job[] = [
  { id: "1", title: "Frontend Developer", description: "React, Tailwind, JS" },
  {
    id: "2",
    title: "Backend Developer",
    description: "Node.js, Express, Prisma",
  },
  { id: "3", title: "Fullstack Developer", description: "React + Node.js" },
  { id: "4", title: "Fullstack Developer", description: "React + Node.js" },
];

const HomeDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen transition-colors duration-300`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="text-2xl font-bold text-blue-800">TalentHub</div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search jobs..."
            className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 border rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="rounded-full w-10 h-10"
            />
            <span>Elkan</span>
          </div>
        </div>
      </header>

      {/* Jobs Section */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">Jobs Listed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border rounded-md shadow hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {job.description}
              </p>
              <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                Apply
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeDashboard;
