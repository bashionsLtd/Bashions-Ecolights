// src/app/admin/api/orders/[id]/route.ts

import { NextResponse } from "next/server";
import supabase from "../../../../lib/utils/supabase/supabaseClient";
import type { Order } from "@/app/admin/types/order";

// ==============================
// GET one order (with items)
// ==============================
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        quantity,
        price,
        created_at
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data as Order);
}


// ==============================
// DELETE an order
// ==============================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, err }, { status: 500 });
  }
}
