import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/user";
import { db } from "@/lib/db";
import { AccountSchema, ExpenseSchema } from "@/schemas";
import { handlePrismaError } from "@/utils/prismaErrorHandler";

export const GET = async (request: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const expenses = await db.expense.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        description: true,
        date: true,
        amount: true,
        Category: true,
        Transaction: true,
      },
    });
    return NextResponse.json({ data: expenses }, { status: 200 });
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    // Authenticate the user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const parsedBody = ExpenseSchema.safeParse(body);

    if (parsedBody.error) {
      return NextResponse.json(
        { error: "Invalid data", details: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { description, date, amount, categoryId, transaction_id } =
      parsedBody.data;

    // Create the new expense in the database
    const newExpense = await db.expense.create({
      data: {
        description,
        date,
        amount,
        categoryId,
        transaction_id,
        userId: user.id,
      },
      select: {
        id: true,
        description: true,
        date: true,
        amount: true,
        Category: true,
        Transaction: true,
      },
    });

    return NextResponse.json({ data: newExpense }, { status: 201 });
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};
