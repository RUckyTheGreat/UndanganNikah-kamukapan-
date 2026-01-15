import React, { useEffect, useState } from "react";

export default function Donation() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("/api/donations")
      .then((res) => res.json())
      .then((data) => setDonations(data));
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin 📋");
  };

  return (
    <section className="py-10 bg-gray-100">
      <h2 className="text-center text-xl font-semibold mb-6">
        Amplop Digital
      </h2>

      <div className="max-w-md mx-auto space-y-4">
        {donations.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded p-4 flex items-center gap-4"
          >
            {item.logo_url && (
              <img
                src={item.logo_url}
                alt={item.bank_name}
                className="w-12 h-12 object-contain"
              />
            )}

            <div className="flex-1">
              <p className="font-semibold">{item.bank_name}</p>
              <p className="text-sm text-gray-600">
                {item.account_holder}
              </p>
              <p className="font-mono mt-1">
                {item.account_number}
              </p>
            </div>

            <button
              onClick={() =>
                copyToClipboard(item.account_number)
              }
              className="bg-black text-white px-3 py-1 rounded text-sm"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
