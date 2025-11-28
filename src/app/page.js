"use client";

import Link from "next/link";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function HomePage() {
  useAuthRedirect();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <p className="text-gray-600 mb-8">Join us and manage your account easily</p>

      <div className="flex space-x-4">
        <Link
          href="/register"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
