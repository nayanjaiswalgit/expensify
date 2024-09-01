"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenCategory } from "@/features/category/hooks/use-open-category"; // Update hook import
import { useDeleteCategory } from "@/features/category/api/use-delete-category"; // Update API hook import

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenCategory(); // Update hook for categories
  const deleteCategory = useDeleteCategory(id); // Update mutation for categories
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category" // Update confirmation text
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteCategory.mutate(undefined, {
        // Ensure mutation is called correctly
        onSuccess: () => {
          // Handle post-delete logic if needed
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteCategory.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteCategory.isPending} // Ensure delete button is disabled during pending state
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
