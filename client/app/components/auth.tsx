"use client";
import React, { useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/mutation";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "signup" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const router = useRouter();
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

    try {
      const res = await auth(mode, payload);

      // res.user.role comes from the backend
      const role = res.user.role;

      if (role === "applicant") router.push("/jobs");
      else if (role === "admin") router.push("/admin");
      else router.push("/job/create");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-500 mb-4 text-center">
        Talent Hub
      </h2>

      <div className="w-full max-w-md p-6 border rounded-lg shadow-md bg-white text-black">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === "signup" ? "Create an Account" : "Welcome Back"}
          </p>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              >
                <option value="">Select Role</option>
                <option value="employer">Employer</option>
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
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
          >
            {loading
              ? "Processing..."
              : mode === "signup"
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 font-medium">
                Sign In
              </Link>
            </>
          ) : (
            <>
              Create an account to get started!{" "}
              <Link href="/signup" className="text-blue-600 font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
