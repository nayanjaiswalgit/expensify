import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { z } from "zod";
import { useNewExpense } from "../hooks/use-new-expense"; // Update this hook if needed
import ExpenseForm from "./expense-form";
import { useConfirm } from "@/hooks/use-confirm";
import { useEditExpense } from "../api/use-edit-expense"; // Update this API hook
import { useOpenExpense } from "../hooks/use-open-expense"; // Update this hook if needed
import { useGetExpense } from "../api/use-get-expense"; // Update this API hook
import { useDeleteExpense } from "../api/use-delete-expense"; // Update this API hook
import { Loader2 } from "lucide-react";
import { ExpenseSchema } from "@/schemas";

const formSchema = ExpenseSchema.pick({
  amount: true,
  description: true,
  date: true,
  categoryId: true,
  transaction_id: true,
});

type FormValue = z.infer<typeof formSchema>;

const EditExpenseSheet = () => {
  const { isOpen, onClose, id } = useOpenExpense(); // Updated hook
  const expenseQuery = useGetExpense(id); // Updated hook
  const editMutation = useEditExpense(id); // Updated hook
  const deleteMutation = useDeleteExpense(id); // Updated hook

  const isLoading = expenseQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this expense"
  );
  const onSubmit = (values: FormValue) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = expenseQuery.data
    ? {
        amount: expenseQuery.data.amount,
        description: expenseQuery.data.description,
        date: expenseQuery.data.date,
        categoryId: expenseQuery.data.categoryId,
        transaction_id: expenseQuery.data.transaction_id,
      }
    : {
        amount: 0,
        description: "",
        date: "",
        categoryId: "",
        transaction_id: "",
      };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Expense</SheetTitle>
            <SheetDescription>
              Edit an expense to keep track of your spending.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ExpenseForm
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValue={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditExpenseSheet;
