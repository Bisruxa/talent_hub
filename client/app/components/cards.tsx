"use client";

import { useState, useEffect } from "react";
import { FaCalendarAlt, FaAmazon, FaFacebook, FaInstagram, FaGoogle, FaApple } from "react-icons/fa";
import ApplyModal from "./applyPopUp";

export interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    logo?: string; // optional, can override random
    role?: string;
    createdAt: string;
    appliedByUser?: boolean;
    createByUser?: { id: string };
  };
}

// Define company icons and their colors
const companyIcons = [
  { name: "Amazon", icon: <FaAmazon className="w-16 h-16" />, color: "text-yellow-500" },
  { name: "Facebook", icon: <FaFacebook className="w-16 h-16" />, color: "text-blue-600" },
  { name: "Instagram", icon: <FaInstagram className="w-16 h-16" />, color: "text-pink-500" },
  { name: "Google", icon: <FaGoogle className="w-16 h-16" />, color: "text-red-500" },
  { name: "Apple", icon: <FaApple className="w-16 h-16" />, color: "text-gray-800" },
];

const getRandomCompany = () => {
  return companyIcons[Math.floor(Math.random() * companyIcons.length)];
};

const JobCard = ({ job }: JobCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(job.appliedByUser || false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [company, setCompany] = useState(companyIcons[0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUserId(localStorage.getItem("userId"));
    }
    setCompany(getRandomCompany()); // assign random company on mount
  }, []);

  const isDisabled = applied || job.createByUser?.id === currentUserId;

  return (
    <div className="relative bg-white shadow-lg rounded-xl p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Company Logo */}
      <div className={`mb-4 ${company.color}`}>{company.icon}</div>

      {/* Job Title & Description */}
      <h3 className="text-xl font-bold text-center">{job.title}</h3>
      <p className="text-gray-700 text-center mt-2">{job.description}</p>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-500 mt-3">
        <FaCalendarAlt />
        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => setShowModal(true)}
        disabled={isDisabled}
        className={`mt-4 w-full py-2 rounded font-semibold transition-all duration-150
          ${applied 
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600 active:translate-y-1 active:shadow-inner"
          }`}
      >
        {applied ? "Applied" : "Apply"}
      </button>

      {/* Apply Modal */}
      {showModal && (
        <ApplyModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          jobId={job.id}
          jobTitle={job.title}
          onApplied={() => setApplied(true)}
        />
      )}
    </div>
  );
};

export default JobCard;
