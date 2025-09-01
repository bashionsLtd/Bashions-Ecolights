"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import ProductForm from "./ProductForm";
import type { Product } from "../../types/product";
import { X } from "lucide-react";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: (product: Product) => void;
  product?: Product;
  mode?: "add" | "edit" | "view";
}

export default function ProductModal({
  open,
  onClose,
  onSaved,
  product,
  mode = "add",
}: ProductModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        <DialogHeader>
          <DialogTitle>
            {mode === "add"
              ? "Add New Product"
              : mode === "edit"
              ? "Edit Product"
              : "View Product"}
          </DialogTitle>
        </DialogHeader>

        <ProductForm
          product={product}
          mode={mode}
          onSaved={onSaved}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

