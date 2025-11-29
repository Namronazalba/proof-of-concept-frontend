"use client";

import Link from "next/link";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function HomePage() {
  useAuthRedirect();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6 text-center">

      <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 sm:mb-4">
        Book Your Service With Ease
      </h1>

      <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-md">
        Schedule appointments, track your bookings, and manage everything in one place—fast, simple, and hassle-free.
      </p>

      <div className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <Link
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full text-center shadow"
        >
          Create Account
        </Link>

        <Link
          href="/login"
          className="px-6 py-3 bg-white text-gray-800 border rounded-lg hover:bg-gray-100 transition w-full text-center shadow"
        >
          Login
        </Link>
      </div>

    </div>

  );
}
