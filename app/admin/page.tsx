"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role !== "admin") {
        router.replace("/");
      } else {
        setAllowed(true);
      }
    };

    checkAdmin();
  }, [router]);

  if (!allowed) {
    return <p className="container">Checking permissions…</p>;
  }

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
    </main>
  );
}
