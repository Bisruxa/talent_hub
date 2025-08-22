"use client";

import { useState, useEffect } from "react";
import { getJobs, deleteJob, type Job } from "@/lib/mutation";
import toast, { Toaster } from "react-hot-toast";
import { FaSun, FaMoon, FaCalendarAlt } from "react-icons/fa";
import CreateJobModal from "../../components/createPopUp";
import Sidebar from "../../components/sidebar";
import Header from "@/app/components/header";

export default function EmployerDashboard() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const fetchjobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs();
      const userId = localStorage.getItem("userId");
      setJobs(res.jobs.filter((job) => job.createByUser.id === userId));
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message || "Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchjobs();
  }, []);

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setDeleting(jobId);
    try {
      await deleteJob(jobId);
      toast.success("Job deleted successfully");
      fetchjobs();
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message || "Failed to delete job");
    } finally {
      setDeleting(null);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const skeletons = Array.from({ length: 6 });

  return (
    <div className={`min-h-screen flex bg-gray-100 text-black`}>
      <Toaster position="top-right" />

      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onCreated={fetchjobs}
      />

      {/* Reusable Sidebar */}
      <Sidebar
        search={search}
        setSearch={setSearch}
        onCreateJob={() => setShowForm(true)}
        buttonLabel="Create Job"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        <Header />

        {/* Mobile search bar */}
        <div className="p-4 border-b border-gray-300 md:hidden">
          <input
            type="text"
            placeholder="Search your jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Main Content */}
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Your Job Listings
          </h2>

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
              <p className="text-gray-700">No jobs created yet.</p>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative"
                >
                  <button
                    onClick={() => handleDelete(job.id)}
                    disabled={deleting === job.id}
                    className="absolute top-3 right-3 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    title="Delete job"
                  >
                    {deleting === job.id ? "..." : "🗑️"}
                  </button>
                  <div className="w-12 h-12 mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-bold">
                      {job.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-black">
                    {job.title}
                  </h3>
                  <p className="text-gray-700 mb-2 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <FaCalendarAlt />
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
