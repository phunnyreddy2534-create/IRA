"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        router.replace("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        router.replace("/");
      } else {
        setAllowed(true);
      }
    };

    verify();
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
