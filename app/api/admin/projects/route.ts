import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (Admin)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { action, projectId } = await req.json();

    if (!action || !projectId) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      await supabase
        .from("projects")
        .update({ status: "approved" })
        .eq("id", projectId);
    }

    if (action === "reject") {
      await supabase
        .from("projects")
        .update({ status: "rejected" })
        .eq("id", projectId);
    }

    if (action === "delete") {
      await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin action failed:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
