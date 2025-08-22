"use client"; 
import React, { useState } from "react";
import Link from 'next/link'
import { auth } from "@/lib/mutation";
import {useRouter} from 'next/navigation'
interface AuthFormProps {
  mode: "signup" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:""
  });
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    

   const payload =
     mode === "signup"
       ? {
           name: formData.name,
           email: formData.email,
           password: formData.password,
           role: formData.role,
         }
       : { email: formData.email, password: formData.password };

console.log("Signup payload:", payload);

   try {
    console.log("Signup payload:", payload);
     await auth(mode, payload);
     router.push("/jobs");
   } catch (err) {
     if (err instanceof Error) setError(err.message);
   } finally {
     setLoading(false);
   }

  };

  return (
    <div className="bg-white h-screen flex flex-col items-center ">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500 border-b-4 border items-center justify-center py-6">
        Talent Hub
      </h2>
      <hr className="bg-black w-full" />
      <div className="p-6 border rounded-lg shadow-md bg-white text-black w-96 mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">
          <div className="text-center">
            <div className="text-lg font-medium">
              {mode === "signup" ? "Create an Account" : "Welcome Back"}
            </div>
            <div className="text-2xl font-bold">
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </div>
          </div>
        </h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Role</option>
                <option value="employee">Employee</option>
                <option value="applicant">Applicant</option>
              </select>
            </>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors "
          >
            {loading
              ? "Processing..."
              : mode === "signup"
              ? "Sign Up"
              : "Sign In"}
          </button>
          {mode === "signup" ? (
            <div className="text-sm text-gray-600 text-center">
              Already have an account?
              <Link href="/signin" className="text-blue-600">
                SignIn
              </Link>
            </div>
          ) : (
            <div className="text-sm text-gray-600 text-center">
              Create an account to get started!
              <Link href="/signup" className="text-blue-600">
                SignUp
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
