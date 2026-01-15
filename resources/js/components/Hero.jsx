import React, { useEffect, useState } from "react";

export default function Hero() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch("/api/event")
      .then(res => res.json())
      .then(data => setEvent(data));
  }, []);

  if (!event) return null;

  return (
    <section className="text-center py-20 bg-white">
      <h1 className="text-3xl font-bold mb-2">
        {event.groom_name} & {event.bride_name}
      </h1>
      <p className="text-gray-600">{event.title}</p>
      <p className="mt-4">
        {event.event_date} • {event.event_time}
      </p>
    </section>
  );
}
