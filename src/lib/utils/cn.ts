// lib/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for combining class names with Tailwind's merge awareness.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClassValue = string | undefined | null | false | Record<string, boolean> | ClassValue[];
