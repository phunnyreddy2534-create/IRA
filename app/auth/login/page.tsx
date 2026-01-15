"use client";

import { motion } from "framer-motion";
import { supabase } from "../../../lib/supabaseClient";

export default function LoginPage() {
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await supabase.auth.signInWithPassword({ email, password });
  };

  return (
    <main className="container" style={{ maxWidth: "420px" }}>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        Login
      </motion.h1>

      <form
        onSubmit={handleLogin}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
