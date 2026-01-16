"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        router.replace("/auth/login");
      } else {
        setUser(data.session.user);
      }
    });
  }, [router]);

  if (!user) return null;

  return (
    <main className="container" style={{ maxWidth: "600px" }}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        My Profile
      </motion.h1>

      <p style={{ marginTop: "12px", color: "#9ca3af" }}>
        Email: {user.email}
      </p>

      <div style={{ marginTop: "24px" }}>
        <button className="btn" onClick={() => router.push("/upload")}>
          Upload Project
        </button>
      </div>
    </main>
  );
}
