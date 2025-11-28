"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import API from "@/utils/api";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/api/bookings", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        // console.log("API response:", res.data); 
        setBookings(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="p-6">Loading bookings...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Bookings</h1>
        <Link
        href="/bookings/create"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
        Create Booking
        </Link>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
            // Inside the <ul> mapping bookings
            <ul className="space-y-6">
            {bookings.map((booking) => (
                <li
                key={booking._id}
                className="p-4 border rounded shadow hover:shadow-md transition flex justify-between items-center"
                >
                <div>
                    <p><strong>Service:</strong> {booking.service}</p>
                    <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                </div>

                <div>
                    <a
                    href={`/bookings/${booking._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                    View
                    </a>
                </div>
                </li>
            ))}
            </ul>

        )}
      </div>
    </div>
  );
}
