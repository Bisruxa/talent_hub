"use client";

import { useState } from "react";
import JobCard from "./cards";
import ApplyModal from "./applyPopUp";

const JobsPage = ({ jobs }: { jobs: any[] }) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const openModal = (job: any) => setSelectedJob(job);
  const closeModal = () => setSelectedJob(null);

  const handleApplied = (jobId: string) => {
    setAppliedJobs([...appliedJobs, jobId]);
    closeModal();
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={{ ...job, appliedByUser: appliedJobs.includes(job.id) }}
          onApply={() => openModal(job)} 
        />
      ))}

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
  );
};


