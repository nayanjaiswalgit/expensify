"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewExpense } from "@/features/expanse/hooks/use-new-expense";
import { useGetExpenses } from "@/features/expanse/api/use-get-expenses";
import { useBulkDeleteExpense } from "@/features/expanse/api/use-bulk-delete-expense";

const ExpensesPage = () => {
  const newExpense = useNewExpense(); // Updated hook
  const expensesQuery = useGetExpenses(); // Updated hook
  const deleteExpenses = useBulkDeleteExpense(); // Updated hook
  const expenses = expensesQuery?.data || [];
  const isDisabled = expensesQuery.isLoading || expensesQuery.isPending;
  console.log(expenses);

  if (expensesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center ">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Expenses</CardTitle>{" "}
          {/* Updated title */}
          <Button onClick={newExpense.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            disabled={isDisabled}
            columns={columns}
            data={expenses} // Updated to use expenses
            filterKey={"description"} // Adjust filterKey if necessary
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteExpenses.mutate({ ids }); // Updated to use deleteExpenses
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesPage;
