"use client";

import { useState } from "react";
import { applyJob } from "../../lib/mutation";

interface ApplyModalProps {
  jobId: string;
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onApplied?: () => void;
}

const ApplyModal = ({
  jobId,
  jobTitle,
  isOpen,
  onClose,
  onApplied,
}: ApplyModalProps) => {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      await applyJob(jobId, note);

      if (onApplied) onApplied();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Overlay with blur & transparency
    <div className="fixed bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-2">Apply for {jobTitle}</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Add an optional note to your application
        </p>

        {error && (
          <p className="text-red-500 mb-4 p-2 bg-red-50 rounded-md">{error}</p>
        )}

        <textarea
          className="w-full border rounded-lg p-3 mb-4 min-h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Why are you interested in this position?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
