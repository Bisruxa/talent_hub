"use client";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userName: string;
  userAvatar: string;
}

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300">
      <Link href="/">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500 border-b-4 border items-center justify-center py-1">
          Talent Hub
        </h2>
      </Link>

      {/* <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-600" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <img
            src={userAvatar}
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <span className="font-medium">{userName}</span>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
