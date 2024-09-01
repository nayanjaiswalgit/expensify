import React from "react";
import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/select";
import { accountType } from "@/lib/utils";
import { AccountSchema } from "@/schemas";

const fromSchema = AccountSchema;

type FormValues = z.input<typeof fromSchema>;

type Props = {
  id?: string;
  defaultValue?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const AccountForm = ({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(fromSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = (value: FormValues) => {
    onSubmit(value);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Form {...form}>
      <form
        className=" space-y-4 pt-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="accountNo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account No.</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Account number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select a category"
                  options={accountType}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save chnages" : "Create Account"}
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
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
