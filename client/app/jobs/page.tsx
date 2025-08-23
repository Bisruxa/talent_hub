"use client";

import { useEffect, useState } from "react";
import { getJobs, type Job } from "../../lib/mutation";
import Sidebar from "../components/sidebar";
import JobCard from "../components/cards";
import Header from "../components/header";
import ApplyModal from "../components/applyPopUp";
import Lottie from "lottie-react";
import empty from "../../public/assets/empty.json";

const HomeDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    getJobs()
      .then((res) => setJobs(res.jobs))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (job: Job) => setSelectedJob(job);
  const closeModal = () => setSelectedJob(null);
  const handleApplied = (jobId: string) => {
    setAppliedJobs([...appliedJobs, jobId]);
    closeModal();
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedRoles.length === 0 ||
        selectedRoles.includes(job.role?.toLowerCase() ?? ""))
  );

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar
        search={search}
        setSearch={setSearch}
        buttonLabel="My Applications"
        myApplicationsLink="/applications"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <Header />

        {/* Mobile search bar */}
        <div className="p-4 border-b border-gray-300 md:hidden">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Jobs Grid */}
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-900">
            Jobs Listed
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl shadow-lg animate-pulse bg-white h-48"
                />
              ))
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={{
                    ...job,
                    appliedByUser: appliedJobs.includes(job.id),
                  }}
                  onApply={() => openModal(job)}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-6 sm:p-10">
                <Lottie
                  animationData={empty}
                  loop={true}
                  style={{ width: 250, maxWidth: "80%", height: "auto" }}
                />
                <p className="text-gray-600 font-semibold mt-4 text-center">
                  No jobs found
                </p>
              </div>
            )}

            {/* Apply Modal */}
            {selectedJob && (
              <ApplyModal
                isOpen={!!selectedJob}
                jobId={selectedJob.id}
                jobTitle={selectedJob.title}
                onClose={closeModal}
                onApplied={() => handleApplied(selectedJob.id)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeDashboard;
