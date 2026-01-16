import { supabase } from "../../lib/supabaseClient";

export default async function NewsPage() {
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <main className="container">
      <h1>Student News & Opportunities</h1>

      <div className="grid" style={{ marginTop: 24 }}>
        {data?.map((n) => (
          <a
            key={n.id}
            href={n.source_url}
            target="_blank"
            className="card"
          >
            <strong>{n.title}</strong>
            <p style={{ color: "#9ca3af", marginTop: 6 }}>
              {n.source}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
