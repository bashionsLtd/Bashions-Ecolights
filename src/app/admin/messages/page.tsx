"use client";

import { useEffect, useState } from "react";
import DeleteButton from "../components/DeleteButton";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  comment: string;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/admin/api/messages");
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDeleted = (id: string | number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  if (loading) return <p className="p-6 mt-22">Loading messages...</p>;

  return (
    <div className="p-8 mt-22">
      <h1 className="text-2xl font-bold pl-3 mb-6">Messages</h1>
      <div className="space-y-1">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg ${
              index % 2 === 0 ? "bg-slate-100" : "bg-white"
            } shadow-sm border`}
          >
            {/* Header: name and timestamp */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-orange-500">{msg.name}</h2>
              <span className="text-xs text-gray-500">
                {new Date(msg.created_at).toLocaleString("en-GB", {
                  timeZone: "Africa/Kigali", // CAT timezone
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Contact info */}
            <p className="font-semibold text-xs text-gray-800 mb-2">
              Contact:{" "}
              <span className="text-gray-600">
                {msg.phone} | {msg.email}
              </span>
            </p>

            {/* Comment */}

            {/* Delete button */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm mb-2">{msg.comment}</p>
              <DeleteButton
                id={msg.id}
                resource="messages"
                onDeleted={handleDeleted}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
