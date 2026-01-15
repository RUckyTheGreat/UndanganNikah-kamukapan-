import React, { useState } from "react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WA_NUMBER;

export default function MessageForm() {
  const [form, setForm] = useState({
    name: "",
    message: "",
    send_to_whatsapp: false,
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.message.trim()) return;

    // simpan ke backend
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // kirim ke whatsapp (client-side)
    if (form.send_to_whatsapp) {
      const text = encodeURIComponent(
        `Pesan dari ${form.name || "Anonim"}:\n\n${form.message}`
      );

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
        "_blank"
      );
    }

    setForm({ name: "", message: "", send_to_whatsapp: false });
    alert("Pesan berhasil dikirim 💌");
  };

  return (
    <section className="py-10 bg-gray-100">
      <h2 className="text-center text-xl font-semibold mb-6">
        Pesan & Doa
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
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          placeholder="Tulis pesan & doa..."
          className="w-full border p-2"
          rows="4"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.send_to_whatsapp}
            onChange={(e) =>
              setForm({
                ...form,
                send_to_whatsapp: e.target.checked,
              })
            }
          />
          Kirim ke WhatsApp
        </label>

        <button className="w-full bg-black text-white py-2">
          Kirim Pesan
        </button>
      </form>
    </section>
  );
}
