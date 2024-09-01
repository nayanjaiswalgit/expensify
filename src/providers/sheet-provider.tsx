"use client";

import React from "react";
import { useMountedState } from "react-use";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditAccountSheet from "@/features/accounts/components/edit-account-sheet";
import { NewTransactionsSheet } from "@/features/transactions/components/new-transaction-sheet";
import EditTransactionSheet from "@/features/transactions/components/edit-transaction-sheet";
import NewExpenseSheet from "@/features/expanse/components/new-expense-sheet";
import NewCategorySheet from "@/features/category/components/new-category-sheet";
import EditCategorySheet from "@/features/category/components/edit-category-sheet";
const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewTransactionsSheet />
      <EditTransactionSheet />
      <NewExpenseSheet />
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
};

export default SheetProvider;
