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
        .eq("status", "paid")
        .single();

      setOwned(!!order);
      setLoading(false);
    };

    checkOwnership();
  }, [params.id]);

  const handleBuy = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("project_id", params.id)
      .eq("user_id", user.id)
      .single();

    if (existing) {
      setOwned(true);
      return;
    }

    setOwned(true);
    alert("Purchase successful. Download unlocked.");
  };

  const handleDownload = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;

    const { data: project } = await supabase
      .from("projects")
      .select("file_path")
      .eq("id", params.id)
      .single();

    if (!project?.file_path) {
      alert("File not available yet.");
      return;
    }

    const { data: file, error } = await supabase.storage
      .from("project-files")
      .download(project.file_path);

    if (error) {
      alert("Access denied.");
      return;
    }

    // Log download
    await supabase.from("downloads").insert({
      user_id: user.id,
      project_id: params.id,
    });

    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.zip";
    a.click();
    URL.revokeObjectURL(url);
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
          onClick={handleDownload}
        >
          Download Project
        </motion.button>
      )}
    </main>
  );
}
