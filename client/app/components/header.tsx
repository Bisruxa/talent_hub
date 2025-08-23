"use client";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useState,useEffect} from 'react'
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userName: string;
  userAvatar: string;
}

const Header = () => {
  const pathname = usePathname()
   const [userName, setUserName] = useState("");

   useEffect(() => {
     const name = localStorage.getItem("userName");
     if (name) setUserName(name);
   }, []);
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300">
      <Link href="/">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500 border-b-4 border items-center justify-center py-1">
          Talent Hub
        </h2>
      </Link>
      {pathname === "/jobs" ? (
        <div>
          {" "}
          <div className="flex items-center  flex-col">
            <img
              src={`https://avatars.dicebear.com/api/identicon/placeholder.svg`}
              alt="Profile"
              className="rounded-full w-10 h-10"
            />

            <small className="font-medium">{userName}</small>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
};

export default Header;
