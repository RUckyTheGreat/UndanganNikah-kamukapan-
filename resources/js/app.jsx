import React from "react";
import { createRoot } from "react-dom/client";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import RSVPForm from "./components/RSVPForm";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import Donation from "./components/Donation";
import "../css/app.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <Countdown />
      <RSVPForm />
      <MessageForm />
      <MessageList />
      <Donation />

    </div>
  );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);

// di dalam App()
