// src/app/admin/api/products/route.ts
// Handles API routes for all products.

import { NextResponse } from "next/server";
import supabase from "../../../lib/utils/supabase/supabaseClient";
import type { Product } from "@/app/admin/types/product";

// GET all products
export async function GET() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data as Product[]);
}

// CREATE a new product
export async function POST(req: Request) {
  const body: Omit<Product, "id" | "created_at" | "updated_at"> = await req.json();

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0] as Product);
}
