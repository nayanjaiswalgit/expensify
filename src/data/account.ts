import { db } from "@/lib/db";

export const getAccountByUseID = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });
    return account;
  } catch {}
};
