"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useDeleteExpense } from "@/features/expanse/api/use-delete-expense";
import { useOpenExpense } from "@/features/expanse/hooks/use-open-expense";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, EllipsisVertical, MoreHorizontal, Trash } from "lucide-react";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenExpense(); // Hook to open expense details or form
  const deleteMutation = useDeleteExpense(id); // Hook for deleting an expense
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this expense"
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(); // Trigger the delete mutation
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <EllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending} // Disable if delete is pending
            onClick={() => onOpen(id)} // Open the expense form for editing
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending} // Disable if delete is pending
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog /> {/* Render the confirm dialog */}
    </>
  );
};
