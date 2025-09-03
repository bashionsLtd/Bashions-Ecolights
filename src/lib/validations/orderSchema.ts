// lib/validations/orderSchema.ts
import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  street: z.string().optional(),
  city: z.string().min(2, "City is required"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{9,15}$/, "Phone must be 9–15 digits (with optional +)"),
  email: z.string().email("Invalid email address"),
  total: z.number().positive("Total must be greater than 0"),
});

export type OrderInput = z.infer<typeof orderSchema>;
