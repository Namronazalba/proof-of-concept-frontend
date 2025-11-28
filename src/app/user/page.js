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
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome to your dashboard! Here you can view your bookings.</p>
      </div>
    </div>
  );
}
