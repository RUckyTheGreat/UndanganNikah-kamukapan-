import React, { useState } from "react";

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: "",
    status: "hadir",
    guest_count: 1,
  });

  const submit = async (e) => {
    e.preventDefault();

    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Terima kasih sudah mengisi RSVP ❤️");
    setForm({ name: "", status: "hadir", guest_count: 1 });
  };

  return (
    <section className="py-10 bg-white">
      <h2 className="text-center text-xl font-semibold mb-6">
        Konfirmasi Kehadiran
      </h2>

      <form
        onSubmit={submit}
        className="max-w-md mx-auto space-y-4"
      >
        <input
          type="text"
          placeholder="Nama (opsional)"
          className="w-full border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="w-full border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="hadir">Hadir</option>
          <option value="tidak_hadir">Tidak Hadir</option>
        </select>

        <input
          type="number"
          min="1"
          className="w-full border p-2"
          value={form.guest_count}
          onChange={(e) =>
            setForm({ ...form, guest_count: e.target.value })
          }
        />

        <button className="w-full bg-black text-white py-2">
          Kirim RSVP
        </button>
      </form>
    </section>
  );
}
