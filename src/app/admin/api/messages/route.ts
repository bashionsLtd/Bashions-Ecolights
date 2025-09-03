import { NextResponse } from "next/server";
import supabase from "../../../lib/utils/supabase/supabaseClient";

// GET - fetch all messages
export async function GET() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - insert a new message
export async function POST(req: Request) {
  const { name, email, phone, comment } = await req.json();

  if (!name || !email || !comment) {
    return NextResponse.json(
      { error: "Name, email, and comment are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ name, email, phone, comment }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}
