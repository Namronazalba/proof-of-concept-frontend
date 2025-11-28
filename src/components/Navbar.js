"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    router.push("/login"); // redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-xl font-bold">MyApp</div>

        {/* Links */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="hover:bg-blue-700 px-3 py-1 rounded transition"
          >
            Home
          </Link>
          <Link
            href="/bookings"
            className="hover:bg-blue-700 px-3 py-1 rounded transition"
          >
            Bookings
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
