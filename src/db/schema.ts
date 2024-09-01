import { z } from "zod";
// export const account = new Account({
//   name,
//   email,
//   userId,
// });

export const insertAccountSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// export const accounts = pgTable("accounts",
//   {
//     id: text("id").primaryKey(),
//     plaidId: text("plaidId"),
//     name: text("name").notNull(),
//     userId: text("userId").notNull(),
//  }

//   );

// export const accountRelations = relations(accounts, ({ many }) => ({
//   transactions: many(transactions)
// }))

// export const categoriesRelations = relations(categories, ({ many }) => ({
//   transactions: many(transactions)
// }))

// export const transactionsRelations = relations(transactions, ({ one }) => ({
//  account : one(accounts, {
//  fields : [transactions.accountId],
//  references : [accounts.id]
//    }),
//  categories : one(categories, {
//  fields : [transactions.categories],
//  references : [categories.id]
//
// }))

export const insertTransactionSchema = z.object({
  date: z.date(),
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  payee: z.string(),
  notes: z.string().optional(),
  accountId: z.string(),
  catergoryId: z.string().optional(),
});
