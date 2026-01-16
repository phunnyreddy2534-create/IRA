"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
  };

  const approveProject = async (id: string) => {
    await supabase.from("projects").update({ status: "approved" }).eq("id", id);
    loadProjects();
  };

  const rejectProject = async (id: string) => {
    await supabase.from("projects").update({ status: "rejected" }).eq("id", id);
    loadProjects();
  };

  const deleteProject = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    loadProjects();
  };

  return (
    <main className="container">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Admin Dashboard
      </motion.h1>

      {projects.map((p) => (
        <div key={p.id} className="card" style={{ marginTop: 16 }}>
          <strong>{p.title}</strong>
          <p>{p.description}</p>
          <p style={{ color: "#9ca3af" }}>Status: {p.status}</p>

          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            {p.status !== "approved" && (
              <button className="btn" onClick={() => approveProject(p.id)}>
                Approve
              </button>
            )}

            {p.status !== "rejected" && (
              <button className="btn" onClick={() => rejectProject(p.id)}>
                Reject
              </button>
            )}

            <button
              className="btn"
              style={{ background: "#dc2626" }}
              onClick={() => deleteProject(p.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
