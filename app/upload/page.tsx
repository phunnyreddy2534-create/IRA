"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"admin" | "user">("user");
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role === "admin" ? "admin" : "user");
    };

    load();
  }, [router]);

  if (!user) return null;

  const isAdmin = role === "admin";

  return (
    <main className="container" style={{ maxWidth: "600px" }}>
      <h1>{isAdmin ? "Admin Upload Project" : "Submit Your Project"}</h1>

      <p style={{ color: "#9ca3af", marginTop: "8px" }}>
        {isAdmin
          ? "Projects published instantly."
          : "Projects require admin approval."}
      </p>

      <form
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <input type="text" placeholder="Project Title" required />
        <textarea placeholder="Project Description" required />
        <input type="text" placeholder="Price (₹)" />
        <input type="file" />

        <button className="btn" type="submit">
          {isAdmin ? "Publish Project" : "Submit for Review"}
        </button>
      </form>
    </main>
  );
}
