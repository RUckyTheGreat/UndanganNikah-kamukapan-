import React, { useEffect, useState } from "react";

export default function Countdown() {
  const eventDate = new Date("2026-06-20T09:00:00");

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 text-center">
      <h2 className="text-xl font-semibold mb-4">Menuju Hari Bahagia</h2>
      <div className="flex justify-center gap-6">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm uppercase">{key}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
