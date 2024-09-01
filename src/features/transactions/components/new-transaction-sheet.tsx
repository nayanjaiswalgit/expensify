import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
// import AccountForm from "./account-form";
import { useNewTransactions } from "../hooks/use-new-transaction";
import { useCreateTransactions } from "../api/use-create-transaction";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Loader2 } from "lucide-react";
import { useCreateCategory } from "@/features/category/api/use-create-category";
import { useGetCategories } from "@/features/category/api/use-get-categories";
import TransactionForm from "./transaction-form";
const formSchema = insertTransactionSchema.omit({ id: true });

type FormValue = z.infer<typeof formSchema>;

export const NewTransactionsSheet = () => {
  const { isOpen, onClose } = useNewTransactions();
  const categoryMutation = useCreateCategory();
  const catergoyQueue = useGetCategories();
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });

  console.log("catergoyQueue", catergoyQueue.data);
  const categoryOptions = catergoyQueue.data?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = accountQuery.data?.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const createMutation = useCreateTransactions();

  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading = createMutation.isLoading || categoryMutation.isLoading;

  const onSubmit = (values: FormValue) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>add a new transactions.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={false}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
