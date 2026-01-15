"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        background: "#111118",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
        {project.title}
      </h3>

      <p style={{ color: "#b5b5b5", fontSize: "14px", marginBottom: "14px" }}>
        {project.description}
      </p>

      <strong style={{ fontSize: "18px" }}>{project.price}</strong>

      <div style={{ marginTop: "16px" }}>
        <Link href={`/projects/${project.id}`}>
          <button
            style={{
              padding: "8px 14px",
              background: "#2563eb",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            View Project
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
