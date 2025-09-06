"use client";

import { useState, ChangeEvent } from "react";
import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import type { Product } from "../../types/product";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useCreateProduct, useUpdateProduct } from "../../../hooks/useProductMutations";
import { FaTimes } from "react-icons/fa";


interface ProductFormProps {
  product?: Product;
  mode?: "add" | "edit" | "view";
  onSaved: (product: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  mode = "add",
  onSaved,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, "id" | "created_at">>(
    product
      ? {
          name: product.name,
          category: product.category,
          price: product.price,
          sale_price: product.sale_price ?? null,
          description: product.description,
          images: product.images || [],
          status: product.status,
        }
      : {
          name: "",
          category: "",
          price: 0,
          sale_price: null,
          description: "",
          images: [],
          status: "New",
        }
  );

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Product name is required.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Price must be greater than 0.";
    if (!form.description) newErrors.description = "Description is required.";
    if (!form.images.length) newErrors.images = "At least one image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? (value === "" ? 0 : Number(value))
          : name === "sale_price"
          ? (value === "" ? null : Number(value))
          : value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data: { url: string | string[] } = await res.json();
      const uploadedUrls = Array.isArray(data.url) ? data.url : [data.url];
      setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (err) {
      console.error("File upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (url: string) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((img) => img !== url) }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const generateShortId = () => Math.random().toString(36).substring(2, 7);

    const newProduct: Product = {
      id: product?.id ?? generateShortId(),
      ...form,
      price: Number(form.price),
      sale_price: form.sale_price === undefined || form.sale_price === null
        ? null
        : Number(form.sale_price),
      created_at: product?.created_at ?? new Date().toISOString(),
    };

    const mutation = product ? updateMutation : createMutation;

    mutation.mutate(newProduct, {
      onSuccess: (saved) => {
        onSaved(saved);
        toast.success(product ? "Product updated successfully 🎉" : "Product created successfully ✅");
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : "Something went wrong");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          disabled={mode === "view"}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          disabled={mode === "view"}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">-- Select Category --</option>
          <option value="Lamps">Lamps</option>
          <option value="Wall Arts">Wall Arts</option>
          <option value="Brand Signs">Brand Signs</option>
          <option value="Kitchen Utensils">Kitchen Utensils</option>
        </select>
        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
      </div>

      {/* Status (only visible in edit mode) */}
      {(mode === "edit" || mode=== 'view')  && (
        <div className="flex flex-col gap-1">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={mode === "view"}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="New">New</option>
            <option value="Old">Old</option>
            <option value="Expired">Expired</option>
          </select>
          {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
        </div>
      )}

      {/* Price */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="Enter price"
          value={(form.price == 0) ? "" : form.price}
          onChange={handleChange}
          disabled={mode === "view"}
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
      </div>

      {/* Sale Price */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="sale_price">Sale Price (optional)</Label>
        <Input
          type="number"
          id="sale_price"
          name="sale_price"
          placeholder="Enter discounted price"
          value={form.sale_price ?? ""}
          onChange={handleChange}
          disabled={mode === "view"}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={form.description}
          onChange={handleChange}
          disabled={mode === "view"}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <Label>Images</Label>
        {mode !== "view" && (
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition",
              errors.images && "border-red-500"
            )}
          >
            <Input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="fileUpload"
              onChange={handleFileChange}
            />
            <Label htmlFor="fileUpload" className="cursor-pointer text-sm font-medium text-gray-600">
              Click or drag images to upload
            </Label>
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
        )}

        {form.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-2">
            {form.images.map((url, idx) => (
              <div key={idx} className="relative w-full h-28 rounded-lg overflow-hidden border shadow-sm">
                <Image src={url} alt={`Uploaded ${idx + 1}`} fill className="object-cover" />
                {mode !== "view" && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                  >
                    <FaTimes className="inline mr-1" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
      </div>

      {/* Actions */}
      {mode !== "view" && (
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
            {createMutation.isPending || updateMutation.isPending
              ? "Saving..."
              : mode === "edit"
              ? "Update Product"
              : "Save Product"}
          </Button>
        </div>
      )}
    </div>
  );
}
