"use client";

import React from "react";
import { useMountedState } from "react-use";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditAccountSheet from "@/features/accounts/components/edit-account-sheet";
import { NewTransactionsSheet } from "@/features/transactions/components/new-transaction-sheet";
import EditTransactionSheet from "@/features/transactions/components/edit-transaction-sheet";
const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewTransactionsSheet />
      <EditTransactionSheet />
    </>
  );
};

export default SheetProvider;
