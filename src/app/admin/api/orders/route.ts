// src/app/admin/api/orders/route.ts
import { NextResponse } from "next/server";
import supabase from "../../../lib/utils/supabase/supabaseClient";
import type { OrderDb, OrderItem } from "@/app/admin/types/order";

function generateOrderId() {
  return "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ==============================
// GET orders with pagination
// ==============================
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      name,
      surname,
      street,
      city,
      phone,
      email,
      total,
      status,
      paid,
      payment_date,
      created_at,
      order_items (
        id,
        product_id,
        quantity,
        price,
        created_at
      )
    `
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1); // <-- pagination here

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data as OrderDb[]);
}

// ==============================
// CREATE order (unchanged)
// ==============================
export async function POST(req: Request) {
  try {
    const body: {
      id?: string;
      name: string;
      surname: string;
      street: string;
      city: string;
      phone: string;
      email: string;
      total: number;
      items: { product_id: string; quantity: number; price: number }[];
    } = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Order must have at least one item" },
        { status: 400 }
      );
    }

    const orderId = body.id || generateOrderId();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          id: orderId,
          name: body.name,
          surname: body.surname,
          street: body.street,
          city: body.city,
          phone: body.phone,
          email: body.email,
          total: body.total,
        },
      ])
      .select()
      .single();

    if (orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 });

    const orderItems: Omit<OrderItem, "id" | "created_at">[] = body.items.map(
      (item) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })
    );

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      await supabase.from("orders").delete().eq("id", orderId);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    return NextResponse.json(order as OrderDb);
  } catch (err: unknown) {
    return NextResponse.json(
      { err: (err as Error).message },
      { status: 500 }
    );
  }
}
