import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useNewCategory } from "../hooks/use-new-category";
import CategoryForm from "./category-form";
import { useCreateCategory } from "../api/use-create-category";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValue = z.infer<typeof formSchema>;

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your expenses and transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValue={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
