"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function UserLanding() {
  const [identifier, setIdentifier] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedIdentifier = localStorage.getItem("identifier");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedIdentifier) setIdentifier(storedIdentifier);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("identifier");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          User Dashboard
        </h1>

        <p className="text-gray-700 text-sm sm:text-base">
          Welcome to your dashboard! Here you can view your bookings.
        </p>
      </div>
    </div>

  );
}
