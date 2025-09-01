// src/hooks/useCreateOrder.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { OrderPayload } from "../admin/types/order";
import type { OrderInput } from "../../lib/validations/orderSchema";

const createOrder = async (order: OrderInput): Promise<OrderPayload> => {
  const res = await fetch("/admin/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Failed to create order");
  }

  return res.json();
};

export function useCreateOrder() {
  return useMutation<OrderPayload, Error, OrderInput>({
    mutationFn: createOrder,
  });
}

