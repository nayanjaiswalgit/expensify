/*
  Warnings:

  - You are about to drop the column `transactionAccountId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_transactionAccountId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "transactionAccountId";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "trans_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
