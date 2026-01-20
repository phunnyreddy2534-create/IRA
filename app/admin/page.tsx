"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const runAdminAction = async (
    action: "approve" | "reject" | "delete",
    projectId: string
  ) => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, projectId }),
      });

      if (!res.ok) {
        console.error("Admin action failed");
        return;
      }

      await loadProjects();
    } finally {
      setLoading(false);
    }
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
              <button
                className="btn"
                disabled={loading}
                onClick={() => runAdminAction("approve", p.id)}
              >
                Approve
              </button>
            )}

            {p.status !== "rejected" && (
              <button
                className="btn"
                disabled={loading}
                onClick={() => runAdminAction("reject", p.id)}
              >
                Reject
              </button>
            )}

            <button
              className="btn"
              style={{ background: "#dc2626" }}
              disabled={loading}
              onClick={() => runAdminAction("delete", p.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
