import React, { useEffect, useState } from "react";

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <section className="py-10 bg-white">
      <h2 className="text-center text-xl font-semibold mb-6">
        Doa & Ucapan
      </h2>

      <div className="max-w-md mx-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border p-4 rounded"
          >
            <p className="font-semibold">
              {msg.name || "Anonim"}
            </p>
            <p className="text-gray-700 mt-1">
              {msg.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
