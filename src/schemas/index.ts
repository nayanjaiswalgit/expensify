// import { UserRole } from "@prisma/client";
import { AccountType } from "@prisma/client";
import * as z from "zod";

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  );

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 charachters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 charachters required" }),
});

export const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  image: z.string().url().optional(),
});

export const AccountSchema = z.object({
  name: z.string().min(5, "Account name is required"),
  accountNo: z.string().min(5, "Account Number is required"),
  type: z.enum([
    AccountType.BANK,
    AccountType.CREDIT_CARD,
    AccountType.SAVINGS,
    AccountType.WALLET,
  ]),
});

export const ExpenseSchema = z.object({
  amount: z.number(),
  description: z.string().optional().nullable(),
  date: z.string().datetime(),
  categoryId: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.string().datetime().optional(), // Optional because it can be generated automatically
  updatedAt: z.string().datetime().optional(), // Optional because it can be generated automatically
  transaction_id  : z.string().optional().nullable(),
});
