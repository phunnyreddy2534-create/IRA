"use client";

import { supabase } from "../../lib/supabaseClient";
import ProjectCard from "../../components/ProjectCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      setProjects(data || []);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <main className="container">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Project Marketplace
      </motion.h1>

      <div className="grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card" style={{ height: 180 }} />
            ))
          : projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </main>
  );
}
