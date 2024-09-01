import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { insertCategorySchema } from "@/db/schema"; // Update schema import
import { z } from "zod";
import { useOpenCategory } from "../hooks/use-open-category"; // Update hook import
import CategoryForm from "./category-form"; // Update component import
import { useConfirm } from "@/hooks/use-confirm";
import { useEditCategory } from "../api/use-edit-category"; // Update API hook import
import { useGetCategory } from "../api/use-get-category"; // Update API hook import
import { useDeleteCategory } from "../api/use-delete-category"; // Update API hook import
import { Loader2 } from "lucide-react";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValue = z.infer<typeof formSchema>;

const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category"
  );

  const onSubmit = (values: FormValue) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  console.log(categoryQuery.data);

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: "",
      };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          // Fix typo: onSucess -> onSuccess
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Edit an existing category to organize your expenses.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
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

export default EditCategorySheet;
