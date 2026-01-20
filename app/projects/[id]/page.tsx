"use client";

import { motion } from "framer-motion";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

export default function ProjectPreview({ params }: Props) {
  const router = useRouter();

  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // ✅ Ownership check (created OR paid)
  useEffect(() => {
    const checkOwnership = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: order } = await supabase
        .from("orders")
        .select("id")
        .eq("project_id", params.id)
        .eq("user_id", user.id)
        .in("status", ["created", "paid"])
        .maybeSingle();

      setOwned(!!order);
      setLoading(false);
    };

    checkOwnership();
  }, [params.id]);

  // ✅ Server-side order creation (RLS-safe)
  const handleBuy = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: params.id,
        amount: 10,
      }),
    });

    if (!res.ok) {
      alert("Unable to create order.");
      return;
    }

    setOwned(true);
    alert("Order created. Download unlocked.");
  };

  // 🔒 SECURE DOWNLOAD (server-authorized, signed URL)
  const handleDownload = async () => {
    try {
      setDownloading(true);

      const res = await fetch(`/api/download/${params.id}`);

      if (!res.ok) {
        alert("You are not authorized to download this file.");
        return;
      }

      const { url } = await res.json();

      if (!url) {
        alert("Download link unavailable.");
        return;
      }

      // Browser handles the signed URL
      window.location.href = url;
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return null;

  return (
    <main className="container">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: "26px" }}
      >
        Project Preview
      </motion.h1>

      <p style={{ marginTop: "6px", color: "#9ca3af" }}>
        Project ID: {params.id}
      </p>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          marginTop: "20px",
          lineHeight: "1.9",
          fontSize: "15px",
        }}
      >
        <li>✔ Full Source Code</li>
        <li>✔ Documentation</li>
        <li>✔ Viva Q&A</li>
        <li>✔ Setup Guide</li>
      </motion.ul>

      {!owned ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn"
          style={{ marginTop: "28px" }}
          onClick={handleBuy}
        >
          Buy & Download
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn"
          style={{ marginTop: "28px" }}
          disabled={downloading}
          onClick={handleDownload}
        >
          {downloading ? "Preparing download…" : "Download Project"}
        </motion.button>
      )}
    </main>
  );
}
