"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
      }
    });
  }, [router]);

  if (!user) return null;

  const isAdmin = user.email?.endsWith("@admin.com");

  return (
    <main className="container" style={{ maxWidth: "600px" }}>
      <h1>{isAdmin ? "Admin Upload Project" : "Submit Your Project"}</h1>

      <p style={{ color: "#9ca3af", marginTop: "8px" }}>
        {isAdmin
          ? "Projects uploaded by admin go live instantly."
          : "Your project will be reviewed before publishing."}
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
