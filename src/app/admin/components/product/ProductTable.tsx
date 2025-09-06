"use client";

import Image from "next/image";
import { useState } from "react";
import { FiEye, FiEdit2, FiPlus } from "react-icons/fi";
import { Product } from "../../types/product";
import ProductModal from "../../components/product/ProductModal";
import DeleteButton from "../../components/DeleteButton"; // ✅ generalized delete button

interface Props {
  products: Product[];
  onAdd?: () => void;
}

const statusClasses = {
  New: "bg-green-100 text-green-700",
  Old: "bg-gray-100 text-gray-700",
  Expired: "bg-red-100 text-red-700",
};

export default function ProductTable({ products: initialProducts, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");

  const handleAdd = () => {
    if (onAdd) return onAdd();
    setSelectedProduct(undefined);
    setMode("add");
    setOpen(true);
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setMode("view");
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setMode("edit");
    setOpen(true);
  };

  const handleSaved = (product: Product) => {
    if (mode === "edit") {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setOpen(false);
  };

  return (
    <div className="bg-white mt-22 rounded-lg shadow pt-8 pb-4 px-6">
      <div className="flex items-center justify-between mb-4 px-3">
        <h2 className="text-xl font-bold">All Products</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 border text-orange-500 hover:bg-orange-500 hover:text-white hover:cursor-pointer px-4 py-2 rounded-md text-sm font-bold shadow"
            title="Add new product"
          >
            <FiPlus />
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-300 text-center text-gray-600 text-xs">
              <th className="rounded-l-md p-3">Product ID</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Sale Price</th>
              <th className="p-3">Description</th>
              <th className="p-3">Images</th>
              <th className="p-3">Status</th>
              <th className="p-3 rounded-r-md text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                className={`text-xs text-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
              >
                <td className="rounded-l-md p-3">{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.price.toFixed(0)} Rwf</td>
                <td className="p-3">
                  {product.sale_price ? `${product.sale_price.toFixed(0)} Rwf` : "-"}
                </td>
                <td className="p-3 max-w-xs truncate">{product.description}</td>
                <td className="p-3">
                  {product.images.length > 0 && (
                    <div className="w-10 h-10 relative rounded overflow-hidden border">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[product.status]}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="rounded-r-md p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                      onClick={() => handleView(product)}
                      title="View"
                    >
                      <FiEye />
                    </button>
                    <button
                      className="p-2 text-green-500 hover:bg-green-50 rounded"
                      onClick={() => handleEdit(product)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <DeleteButton
                      id={product.id}
                      resource="products" // ✅ tells delete button this is for products
                      onDeleted={(deletedId) =>
                        setProducts((prev) => prev.filter((p) => p.id !== deletedId))
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit/View Product */}
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSaved={handleSaved}
        product={selectedProduct}
        mode={mode}
      />
    </div>
  );
}
