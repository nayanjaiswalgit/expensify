import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { ExpenseSchema } from "@/schemas";
import { handlePrismaError } from "@/utils/prismaErrorHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const expense = await db.expense.findUnique({
      where: { id, userId: user.id },
      select: {
        id: true,
        description: true,
        date: true,
        amount: true,
        Category: true,
        Transaction: true,
      },
    });
    return NextResponse.json({ data: expense }, { status: 200 });
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const PATCH = async (request: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

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

    const updatedExpense = await db.expense.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        description,
        date,
        amount,
        categoryId,
        transaction_id,
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

    if (!updatedExpense) {
      return NextResponse.json(
        { error: "Invalid id, or expense not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updatedExpense }, { status: 200 });
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const deletedExpense = await db.expense.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!deletedExpense) {
      return NextResponse.json(
        { error: "Invalid id, or expense not found" },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};
