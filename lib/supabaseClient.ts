// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Safety net: ensure profile exists (no duplicates)
export async function ensureProfile(user: any) {
  if (!user) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!data && error) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      role: "user",
    });
  }
}
