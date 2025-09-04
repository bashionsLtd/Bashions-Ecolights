import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/utils/supabase/supabaseServ";

// DELETE - remove a message by ID
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
