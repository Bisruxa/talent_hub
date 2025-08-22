"use client"; // required if using Next 13 app directory

import React, { useState } from "react";

interface AuthFormProps {
  mode: "signup" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = mode === "signup" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        mode === "signup"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }
          : { email: formData.email, password: formData.password };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      console.log("Success:", data);
      // Optionally save token to localStorage or cookies
      localStorage.setItem("token", data.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md bg-white dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {mode === "signup" ? "Sign Up" : "Sign In"}
      </h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {loading
            ? "Processing..."
            : mode === "signup"
            ? "Sign Up"
            : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
