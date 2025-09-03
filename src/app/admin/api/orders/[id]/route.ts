import { NextResponse } from "next/server";
import supabase from "../../../../lib/utils/supabase/supabaseClient";
import type { Order } from "@/app/admin/types/order";

type Params = {
  params: {
    id: string;
  };
};

// ==============================
// GET one order (with items)
// ==============================
export async function GET(req: Request, context: Params) {
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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Order);
}

// ==============================
// UPDATE editable fields
// ==============================
export async function PUT(req: Request, context: Params) {
  try {
    const { id } = context.params;
    const body: { status?: string; paid?: boolean; payment_date?: string } =
      await req.json();

    const { data, error } = await supabase
      .from("orders")
      .update({
        ...(body.status && { status: body.status }),
        ...(body.paid !== undefined && { paid: body.paid }),
        ...(body.payment_date && { payment_date: body.payment_date }),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Order);
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

// ==============================
// DELETE an order
// ==============================
export async function DELETE(req: Request, context: Params) {
  try {
    const { id } = context.params;

    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, err }, { status: 500 });
  }
}
