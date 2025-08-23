"use client";

import { useEffect, useState } from "react";
import JobCard from "../components/cards";
import { getMyApplications } from "../../lib/mutation";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Lottie from "lottie-react";
import empty from "../../public/assets/empty.json";

const MyApplicationsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMyApplications()
      .then((res) => setJobs(res.jobs))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar search={search} setSearch={setSearch} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/jobs"
            className="inline-flex items-center text-gray-700 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </Link>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-6">My Applications</h2>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            skeletons.map((_, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl shadow-lg animate-pulse bg-white h-48"
              />
            ))
          ) : jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-6 sm:p-10">
              <Lottie
                animationData={empty}
                loop={true}
                style={{ width: 250, maxWidth: "80%", height: "auto" }}
              />
              <p className="text-gray-600 font-semibold mt-4 text-center">
                You have not applied for any job yet.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyApplicationsPage;
