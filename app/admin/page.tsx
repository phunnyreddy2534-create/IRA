"use client";

import { motion } from "framer-motion";

export default function AdminPage() {
  return (
    <main className="container">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Admin Dashboard
      </motion.h1>

      <div className="grid" style={{ marginTop: "24px" }}>
        <div className="card">📦 Total Projects: 12</div>
        <div className="card">👥 Registered Users: 48</div>
        <div className="card">💰 Sales (Demo): ₹0</div>
      </div>
    </main>
  );
}
