"use client";

import { useState, useEffect } from "react";
import Header from "../components/header";
import { getJobs } from "../../lib/mutation"; // fetch jobs with applications
import { Job } from "../../lib/mutation";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userRole = localStorage.getItem("role") || "";
    setRole(userRole);

    const fetchJobs = async () => {
      const res = await getJobs(); // should include Applications and users
      setJobs(res.jobs);
    };

    fetchJobs();
  }, []);

  const handleApprove = async (jobId: string, applicationId: string) => {
    // call your API to approve application
    console.log("Approve", jobId, applicationId);
  };

  const handleReject = async (jobId: string, applicationId: string) => {
    // call your API to reject application
    console.log("Reject", jobId, applicationId);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Header/>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 shadow-md rounded-xl p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <p className="text-gray-700 mb-2">{job.description}</p>
            <p className="text-gray-600 text-sm mb-2">
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              {job._count?.Applications ?? 0} applicant(s)
            </p>

            {job.Applications && job.Applications.length > 0 ? (
              <div className="space-y-2">
                {job.Applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex justify-end items-center bg-white rounded p-2 shadow"
                  >
                    {/* <span>{app.userId}</span>{" "} */}
                   
                    <div className="flex gap-2">
                      {app.status === "applied" && (
                        <>
                          <button
                            onClick={() => handleApprove(job.id, app.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(job.id, app.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {app.status !== "applied" && (
                        <span className="font-medium text-gray-600">
                          {app.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No applicants yet</p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default AdminDashboard;
