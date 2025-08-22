import Link from "next/link";
import { MdPerson } from "react-icons/md";

const LandingPage = () => {
  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-18 py-4 ">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500">
          Talent Hub
        </h2>

        <div className="flex space-x-8 text-gray-700 font-medium">
          <Link href="/">About Us</Link>
          <Link href="/">Blog</Link>
          <Link href="/">Contact Us</Link>
        </div>

        <div>
          <Link href="/signup">
            <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-emerald-500 transition flex items-center gap-2">
              <MdPerson size={24} />
              <span>My Account</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center h-full px-32 gap-8">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
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

        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="/assets/landing.png"
            alt="Talent Hub Hero"
            className="w-96 rounded-lg h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
