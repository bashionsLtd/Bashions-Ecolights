"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { toast } from "sonner";
import { FiTrash2 } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteButtonProps {
  id: string | number;
  resource: "products" | "messages" | "orders"; // extendable
  onDeleted: (id: string | number) => void;
}

export default function DeleteButton({ id, resource, onDeleted }: DeleteButtonProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) {
        throw new Error(`Failed to delete ${resource.slice(0, -1)}`);
      }
      return data;
    },
    onSuccess: () => {
      toast.success(`✅ ${resource.slice(0, -1)} deleted successfully`);

      // Invalidate cached list so it refetches
      queryClient.invalidateQueries({ queryKey: [resource] });
      onDeleted(id); 
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : `❌ Failed to delete ${resource.slice(0, -1)}`);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-500 hover:text-red-700">
          <FiTrash2 className="inline mr-1" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {resource.slice(0, -1)}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
