"use client";

import { motion } from "framer-motion";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function ProjectPreview({ params }: Props) {
  const router = useRouter();

  const handleBuy = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Check if already purchased
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("project_id", params.id)
      .eq("user_id", user.id)
      .single();

    if (existing) {
      alert("You already own this project.");
      return;
    }

    // Create order (payment gateway will come later)
    await supabase.from("orders").insert({
      project_id: params.id,
      user_id: user.id,
      amount: 10,
      status: "paid",
    });

    alert("Purchase successful. Download unlocked.");
  };

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

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="btn"
        style={{ marginTop: "28px" }}
        onClick={handleBuy}
      >
        Buy & Download
      </motion.button>
    </main>
  );
}
