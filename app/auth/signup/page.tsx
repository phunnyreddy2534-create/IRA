"use client";

import { motion } from "framer-motion";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ redirect after signup
    router.push("/");
  };

  return (
    <main className="container" style={{ maxWidth: "420px" }}>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        Create Account
      </motion.h1>

      <form
        onSubmit={handleSignup}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <input type="text" placeholder="Name" />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </main>
  );
}
