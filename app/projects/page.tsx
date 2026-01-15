"use client";

import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";

const projects = [
  {
    id: "1",
    title: "AI Phishing Detection",
    description: "Multi-agent ML-based phishing & smishing detection system",
    price: "₹999",
  },
  {
    id: "2",
    title: "Student Attendance System",
    description: "Smart attendance using face recognition",
    price: "₹799",
  },
];

export default function ProjectsPage() {
  return (
    <main className="container">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "24px" }}
      >
        Project Marketplace
      </motion.h1>

      <div className="grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  );
}
