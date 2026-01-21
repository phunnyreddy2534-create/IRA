import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ Lightweight slug generator (no dependency)
function makeSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(req: Request) {
  // 🔐 Cron protection
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const apiKey = process.env.NEWS_API_KEY!;
    const categories = ["technology", "business"];

    for (const category of categories) {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=10&apiKey=${apiKey}`
      );

      const json = await res.json();
      const articles = json.articles || [];

      for (const article of articles) {
        if (!article.title || !article.url) continue;

        const slug = makeSlug(article.title);

        // 🚫 Avoid duplicates
        const { data: exists } = await supabase
          .from("news")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

        if (exists) continue;

        await supabase.from("news").insert({
          title: article.title,
          slug,
          summary: article.description,
          content: article.content,
          source: article.source?.name || "NewsAPI",
          source_url: article.url,
          image_url: article.urlToImage,
          category,
          published_at: article.publishedAt,
          is_auto: true,
          is_active: true,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "News fetch failed" },
      { status: 500 }
    );
  }
}
