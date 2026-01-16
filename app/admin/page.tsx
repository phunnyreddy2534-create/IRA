"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u || !u.email?.endsWith("@admin.com")) {
        router.push("/");
      } else {
        setUser(u);
      }
    });
  }, [router]);

  if (!user) return null;

  return (
    <main className="container">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Admin Dashboard
      </motion.h1>

      <div className="grid" style={{ marginTop: "24px" }}>
        <div className="card">📦 All Projects</div>
        <div className="card">⏳ Pending Approvals</div>
        <div className="card">📰 Manage News</div>
        <div className="card">👥 Users</div>
      </div>

      <div className="card" style={{ marginTop: "24px" }}>
        <strong>Project Moderation (UI Ready)</strong>
        <p style={{ color: "#9ca3af", marginTop: "8px" }}>
          Approve, reject, edit, or delete projects here (logic comes next).
        </p>
      </div>
    </main>
  );
}
