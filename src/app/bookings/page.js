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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">All Bookings</h1>

          <Link
            href="/bookings/create"
            className="mt-3 sm:mt-0 bg-green-600 text-white px-4 py-2 rounded-lg 
                      hover:bg-green-700 transition text-center sm:w-auto w-full"
          >
            Create Booking
          </Link>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          <ul className="space-y-4 sm:space-y-6">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="p-4 bg-white border rounded-xl shadow-sm 
                          hover:shadow-md transition flex flex-col sm:flex-row 
                          justify-between gap-4"
              >
                <div className="text-sm sm:text-base">
                  <p><strong>Service:</strong> {booking.service}</p>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                </div>

                <div className="flex sm:block">
                  <a
                    href={`/bookings/${booking._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg 
                              hover:bg-blue-700 transition w-full sm:w-auto text-center"
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
