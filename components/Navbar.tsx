"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        style={{
          position: "relative",
          fontWeight: active ? 600 : 400,
          color: active ? "#6d5dfc" : "#ffffff",
        }}
      >
        {label}
        {active && (
          <motion.span
            layoutId="nav-underline"
            style={{
              position: "absolute",
              bottom: -6,
              left: 0,
              right: 0,
              height: 2,
              background: "#6d5dfc",
              borderRadius: 2,
            }}
          />
        )}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "16px 24px",
        display: "flex",
        gap: "24px",
        alignItems: "center",
        borderBottom: "1px solid #1f1f2e",
        backdropFilter: "blur(10px)",
        background: "rgba(11,11,15,0.75)",
      }}
    >
      <Link href="/" style={{ fontWeight: 800, fontSize: "18px" }}>
        IRA
      </Link>

      <div style={{ display: "flex", gap: "18px" }}>
        <NavLink href="/projects" label="Projects" />
        <NavLink href="/upload" label="Upload" />
        <NavLink href="/auth/login" label="Login" />
      </div>
    </motion.nav>
  );
}
