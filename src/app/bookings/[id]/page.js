"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import API from "@/utils/api";

export default function BookingDetail() {
  const router = useRouter();
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/api/bookings/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        setBooking(res.data);

        if (res.data.attachments) {
          res.data.attachments.forEach((att) => {
            console.log("Attachment URL:", att.url);
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <p className="p-6">Loading booking...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!booking) return <p className="p-6">Booking not found.</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Booking Details</h1>

        <p><strong>Service:</strong> {booking.service}</p>
        <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>

        {/* Attachments */}
        {booking.attachments?.length > 0 && (
          <div className="mt-4">
            <strong>Attachments:</strong>
            <ul className="list-disc list-inside">
              {booking.attachments.map((att) => (
                <li key={att._id}>
                  <a
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {att.filename}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Messages */}
        {booking.messages?.length > 0 && (
          <div className="mt-4">
            <strong>Messages:</strong>
            <ul className="list-disc list-inside">
              {booking.messages.map((msg) => (
                <li key={msg._id}>
                  <span className="font-semibold">
                    {msg.sender?.email || msg.sender?.phone || "Unknown User"}
                  </span>
                  : {msg.content}{" "}
                  <span className="text-gray-500 text-sm">
                    ({new Date(msg.createdAt).toLocaleString()})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}
