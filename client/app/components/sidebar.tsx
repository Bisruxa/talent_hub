"use client";

import Link from "next/link";
import { FaSearch, FaPlus } from "react-icons/fa";

interface SidebarProps {
  title?: string; // Optional title like "Dashboard" or "Filters"
  search: string;
  setSearch: (value: string) => void;
  onCreateJob?: () => void; // Optional create button handler
  buttonLabel?: string; // Optional label for action button
  roles?: string[]; // Optional roles for filtering
  // toggleRole?: (role: string) => void; // Optional role toggle
  myApplicationsLink?: string; // Optional link for applications
}

const Sidebar = ({
  title = "Filters",
  search,
  setSearch,
  onCreateJob,
  buttonLabel = "Create Job",
  roles = ["Frontend", "Backend", "Fullstack"],
  // toggleRole,
  myApplicationsLink,
}: SidebarProps) => {
  return (
    <aside className="w-64 p-6 border-r border-gray-300 h-screen hidden md:block fixed">
      {/* Sidebar Title */}
      <h3 className="text-lg font-bold mb-4 text-blue-800">{title}</h3>

      {/* Search Input */}
      <div className="mb-6 relative">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-3 py-2 border-none rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
      </div>

      {/* Role Filters */}
      {roles.length > 0 && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Role</label>
          <div className="flex flex-col gap-2">
            {roles.map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer"
              >
                {/* Uncomment if you implement toggleRole */}
                {/* <input
                  type="checkbox"
                  checked={selectedRoles.includes(role.toLowerCase())}
                  onChange={() => toggleRole(role)}
                  className="accent-blue-800"
                /> */}
                <span className="font-extrabold text-blue-800">{role}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Action Button (Create Job or Custom) */}
      {onCreateJob && (
        <div className="mt-8">
          <button
            onClick={onCreateJob}
            className="flex items-center justify-center gap-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 w-full"
          >
            <FaPlus /> {buttonLabel}
          </button>
        </div>
      )}

      {/* My Applications Button */}
      {myApplicationsLink && (
        <div className="mt-72 flex text-center items-center justify-center">
          <Link href={myApplicationsLink}>
            <button
              className="px-4 py-3 text-white rounded"
              style={{ backgroundColor: "#10B981" }}
            >
              My Applications
            </button>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
