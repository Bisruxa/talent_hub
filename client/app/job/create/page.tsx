"use client";
import { useState, useEffect } from "react";
import { createJob, getJobs, deleteJob, type Job } from "@/lib/mutation";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaSun, FaMoon, FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";

export default function EmployerDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const fetchjobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs();
      const userId = localStorage.getItem("userId");
      setJobs(res.jobs.filter((job) => job.createByUser.id === userId));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Error fetching jobs");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchjobs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJob({ title, description });
      toast.success("Job created Successfully");
      setTitle("");
      setDescription("");
      setShowForm(false);
      fetchjobs();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to create job");
      }
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    setDeleting(jobId);
    try {
      await deleteJob(jobId);
      toast.success("Job deleted successfully");
      fetchjobs(); // Refresh the list
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to delete job");
      }
    } finally {
      setDeleting(null);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const skeletons = Array.from({ length: 6 });

  return (
    <div className={`min-h-screen flex bg-gray-100 text-balck`}>
      <Toaster position="top-right" />

      {/* Job Form Popup Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute bg-white bg-opacity-50 text-black"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold text-black">Create Job</h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="Enter job title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black">
                  Description
                </label>
                <textarea
                  placeholder="Enter job description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  required
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100  text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Create Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-300 dark:border-gray-700 hidden md:block">
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E40AF" }}>
          Dashboard
        </h3>

        {/* Search */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search your jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
          />
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors w-full"
          >
            <FaPlus /> Create Job
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500">
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

            {/* Mobile search and create button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowForm(true)}
                className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"
                title="Create Job"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile search bar */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 md:hidden">
          <input
            type="text"
            placeholder="Search your jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Main Content */}
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#1E40AF" }}
          >
            Your Job Listings
          </h2>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {loading ? (
              skeletons.map((_, idx) => (
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
            ) : filteredJobs.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">
                No jobs created yet.
              </p>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative"
                >
                  {/* Delete button positioned at top right corner */}
                  <button
                    onClick={() => handleDelete(job.id)}
                    disabled={deleting === job.id}
                    className="absolute top-3 right-3 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    title="Delete job"
                  >
                    {deleting === job.id ? (
                      <span className="loading-spinner">...</span>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  <div className="w-12 h-12 mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-bold">
                      {job.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-black">{job.title}</h3>
                  <p className="text-gray-700 mb-2 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <FaCalendarAlt />{" "}
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
