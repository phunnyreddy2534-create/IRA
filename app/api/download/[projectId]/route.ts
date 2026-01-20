import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const cookieStore = cookies();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // 1️⃣ Verify user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Verify ownership
  const { data: order } = await supabase
    .from("orders")
    .select("id")
    .eq("project_id", params.projectId)
    .eq("user_id", user.id)
    .in("status", ["created", "paid"])
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3️⃣ Get project file
  const { data: project } = await supabase
    .from("projects")
    .select("file_path")
    .eq("id", params.projectId)
    .single();

  if (!project?.file_path) {
    return NextResponse.json(
      { error: "File not available" },
      { status: 404 }
    );
  }

  // 4️⃣ Create signed URL (60 seconds)
  const { data: signed, error } = await supabase.storage
    .from("project-files")
    .createSignedUrl(project.file_path, 60);

  if (error) {
    return NextResponse.json(
      { error: "Unable to generate link" },
      { status: 500 }
    );
  }

  // 5️⃣ Log download
  await supabase.from("downloads").insert({
    user_id: user.id,
    project_id: params.projectId,
  });

  return NextResponse.json({ url: signed.signedUrl });
}
