"use client";

import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <main className="container" style={{ maxWidth: "420px" }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Create Account
      </motion.h1>

      <form
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </main>
  );
}
