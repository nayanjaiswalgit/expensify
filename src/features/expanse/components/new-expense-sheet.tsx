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
import ExpenseForm from "./expense-form"; // Ensure this is the correct path to your form component
import { useCreateExpense } from "../api/use-create-expense"; // Update this API hook
import { ExpenseSchema } from "@/schemas";

const formSchema = ExpenseSchema.pick({
  amount: true,
  description: true,
  date: true,
  categoryId: true,
  transaction_id: true,
});

type FormValue = z.infer<typeof formSchema>;

const NewExpenseSheet = () => {
  const { isOpen, onClose } = useNewExpense(); // Updated hook
  const mutation = useCreateExpense(); // Updated hook
  const onSubmit = (values: FormValue) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Expense</SheetTitle>
          <SheetDescription>
            Create a new expense to track your spending.
          </SheetDescription>
        </SheetHeader>
        <ExpenseForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValue={{
            amount: 0,
            description: "",
            date: "",
            categoryId: "",
            transaction_id: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewExpenseSheet;
