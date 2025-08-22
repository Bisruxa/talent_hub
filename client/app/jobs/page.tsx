"use client";
import { useEffect, useState } from "react";
import { getJobs, type Job } from "../../lib/mutation";
import { FaSun, FaMoon } from "react-icons/fa";
import Sidebar from "../components/sidebar";
import JobCard from "../components/cards";
import Header from "../components/header";

const HomeDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    getJobs()
      .then((res) => setJobs(res.jobs))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleRole = (role: string) => {
    const normalized = role.toLowerCase();
    setSelectedRoles((prev) =>
      prev.includes(normalized)
        ? prev.filter((r) => r !== normalized)
        : [...prev, normalized]
    );
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedRoles.length === 0 ||
        selectedRoles.includes(job.role?.toLowerCase()))
  );

  const skeletons = Array.from({ length: 6 });

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen flex`}
    >
      {/* Sidebar */}
      <Sidebar
        search={search}
        setSearch={setSearch}
        buttonLabel="My Applications"
        myApplicationsLink="/applications"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        {/* <header className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500 border-b-4 border items-center justify-center py-1">
            Talent Hub
          </h2>
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
        </header> */}
        <Header></Header>

        {/* Jobs Grid */}
        <main className="p-6 flex-1 overflow-auto">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#1E40AF" }}
          >
            Jobs Listed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading || error
              ? skeletons.map((_, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl shadow-lg animate-pulse bg-white"
                  >
                    <div className="w-12 h-12 mb-2 rounded-full bg-gray-300" />
                    <div className="h-5 bg-gray-300 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-300 rounded mb-4 w-full" />
                    <div className="h-8 bg-gray-300 rounded w-full" />
                  </div>
                ))
              : filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeDashboard;
