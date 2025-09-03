// src/app/admin/api/products/[id]/route.ts
// Handles API routes for individual products (CRUD by id).

import { NextResponse } from "next/server";
import supabase from "../../../../lib/utils/supabase/supabaseClient";
import type { Product } from "@/app/admin/types/product";

// GET one product
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ await before using id

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Product);
}

// UPDATE product
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body: Partial<Product> = await req.json();

  const { data, error } = await supabase
    .from("products")
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.[0] as Product);
}

// DELETE product
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
