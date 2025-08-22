"use client";
import { useEffect, useState } from "react";
import JobCard from "../components/cards";
import { getMyApplications } from "../../lib/mutation"; // your API call
import Sidebar from "../components/sidebar";

const MyApplicationsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    getMyApplications()
      .then((res) => setJobs(res.jobs))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar
        search={search}
        setSearch={setSearch}
        selectedRoles={selectedRoles}
        // toggleRole={toggleRole}
      />
      <main className="flex-1 p-6 ml-64">
        <h2 className="text-2xl font-bold mb-4">My Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading || error
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl shadow-lg animate-pulse bg-white"
                />
              ))
            : jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </main>
    </div>
  );
};

export default MyApplicationsPage;
