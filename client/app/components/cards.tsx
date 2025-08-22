"use client";
import { FaCalendarAlt } from "react-icons/fa";

export interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    logo?: string;
    role?: string;
    createdAt: string;
    appliedByUser?: boolean;
    createByUser?: { id: string };
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const isDisabled =
    job.appliedByUser ||
    job.createByUser?.id === localStorage.getItem("userId");

  return (
    <div className="p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      <img
        src={job.logo || "https://via.placeholder.com/50"}
        alt={`${job.title} logo`}
        className="w-12 h-12 mb-2 rounded-full object-cover"
      />
      <h3 className="text-lg font-bold mb-1">{job.title}</h3>
      <p className="text-gray-700 mb-2">{job.description}</p>
      <div className="flex items-center gap-2 mt-2 text-gray-500">
        <FaCalendarAlt />
        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
      </div>
      <button
        className="mt-3 px-3 py-1 rounded transition-colors w-full font-semibold"
        style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
        disabled={isDisabled}
      >
        {job.appliedByUser ? "Applied" : "Apply"}
      </button>
    </div>
  );
};

export default JobCard;
