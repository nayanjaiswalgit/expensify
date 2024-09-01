import React from "react";
import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/ui/amount-input";
import { convertAmountToMiliunits } from "@/lib/utils";

const fromSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  catergoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.number(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
  id: true,
});
type FormValues = z.input<typeof fromSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValue?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string };
  categoryOptions: { label: string; value: string };
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

const TransactionForm = ({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(fromSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = (value: FormValues) => {
    const amount = parseFloat(value.amount);
    const amountInMiliUnits = convertAmountToMiliunits(amount);
    onSubmit({
      ...value,
      amount: amountInMiliUnits,
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form
        className=" space-y-4 pt-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="account"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="catergoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select a category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add a Payee"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  placeholder="0.00"
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />        <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Optional notes"
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save chnages" : "Create Transaction"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete Transaction
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TransactionForm;
