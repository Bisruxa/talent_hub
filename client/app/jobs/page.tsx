"use client";
import { useEffect, useState } from "react";
import { getJobs, Job } from "../../lib/mutation";
import { FaSun, FaMoon, FaSearch, FaCalendarAlt } from "react-icons/fa";

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
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedRoles.length === 0 || selectedRoles.includes(job.role))
  );

  const skeletons = Array.from({ length: 6 });

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen flex`}
    >
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-300">
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
            {["Frontend", "Backend", "Fullstack"].map((role) => (
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
                <span className="font-extrabold text-blue-800">{role}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-gray-300">
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
        </header>

        {/* Jobs Grid */}
        <main className="p-6 flex-1 overflow-auto">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#1E40AF" }}
          >
            Jobs Listed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(loading || error ? skeletons : filteredJobs).map(
              (job: any, idx: number) => (
                <div
                  key={loading || error ? idx : job.id}
                  className="p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
                >
                  {/* Company Logo */}
                  {!(loading || error) && (
                    <img
                      src={job.logo || "https://via.placeholder.com/50"}
                      alt={`${job.title} logo`}
                      className="w-12 h-12 mb-2 rounded-full object-cover"
                    />
                  )}

                  <div
                    className="h-5 bg-gray-300 rounded mb-2 w-3/4 animate-pulse"
                    style={{ display: loading || error ? "block" : "none" }}
                  />
                  <div
                    className="h-3 bg-gray-300 rounded mb-4 w-full animate-pulse"
                    style={{ display: loading || error ? "block" : "none" }}
                  />

                  {!loading && !error && (
                    <>
                      <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                      <p className="text-gray-700 mb-2">{job.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-gray-500">
                        <FaCalendarAlt />{" "}
                        <span>
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </>
                  )}

                  <button
                    className="mt-3 px-3 py-1 rounded transition-colors w-full font-semibold"
                    style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
                    disabled={
                      loading ||
                      error ||
                      job.appliedByUser ||
                      job.createByUser?.id === localStorage.getItem("userId")
                    }
                  >
                    {loading || error
                      ? ""
                      : job.appliedByUser
                      ? "Applied"
                      : "Apply"}
                  </button>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeDashboard;
