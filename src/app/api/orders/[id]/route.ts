// src/app/admin/api/orders/[id]/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { supabaseClient as supabase } from "@/lib/utils/supabase/supabaseClient";
import type { Order } from "@/app/admin/types/order";

type OrderCtx = { params: Promise<{ id: string }> }; // <-- local helper

export async function GET(_req: NextRequest, ctx: OrderCtx) {
  const { id } = await ctx.params;
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items ( id, product_id, quantity, price, created_at )
    `)
    .eq("id", id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Order);
}

export async function PUT(req: NextRequest, ctx: OrderCtx) {
  const { id } = await ctx.params;
  const body: { status?: string; paid?: boolean; payment_date?: string | null } =
    await req.json();
  const { data, error } = await supabase
    .from("orders")
    .update({
      ...(body.status && { status: body.status }),
      ...(body.paid !== undefined && { paid: body.paid }),
      ...(body.payment_date !== undefined && { payment_date: body.payment_date }),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Order);
}

export async function DELETE(_req: NextRequest, ctx: OrderCtx) {
  const { id } = await ctx.params;
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
