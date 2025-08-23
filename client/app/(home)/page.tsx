"use client"
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-gray-200 relative">
        <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500">
          Talent Hub
        </h2>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/">About Us</Link>
          <Link href="/">Blog</Link>
          <Link href="/">Contact Us</Link>
        </div>

        {/* Account Button */}
        <div className="hidden md:block">
          <Link href="/signup">
            <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-emerald-500 transition flex items-center gap-2">
              <MdPerson size={24} />
              <span>My Account</span>
            </button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden z-20 text-black">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-lg flex items-center gap-2">
                <MdPerson size={20} />
                My Account
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 px-6 md:px-32 gap-8">
        {/* Text */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 leading-tight">
            Where Talent Finds Opportunity
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Your skills deserve the spotlight. Turn possibilities into
            achievements where dreams come to life.
          </p>
          <Link href="/signin">
            <button className="px-8 py-4 bg-blue-800 text-white rounded-lg hover:bg-emerald-500 transition shadow-lg text-lg font-semibold transform hover:-translate-y-1 hover:scale-105">
              Explore More
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="/assets/landing.png"
            alt="Talent Hub Hero"
            className="w-72 md:w-96 rounded-lg h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
