"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      style={{
        padding: "20px",
        textAlign: "center",
        color: "#888",
        fontSize: "14px",
      }}
    >
      © {new Date().getFullYear()} IRA · Build · Learn · Earn
    </motion.footer>
  );
}
