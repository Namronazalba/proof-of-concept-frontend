"use client"; 
import { useState } from "react";
import API from "@/utils/api";
import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  useAuthRedirect();
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await API.post("/api/auth/register", { phone, email, password });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

        <form className="space-y-4" onSubmit={handleRegister}>
            <div>
            <label className="block mb-1 font-medium text-gray-700">Phone</label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
            </div>

            <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
            </div>

            <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
            Register
            </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
            Login
            </a>
        </p>
        </div>
    </div>
    );

}
