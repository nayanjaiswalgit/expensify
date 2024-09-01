import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { AccountSchema } from "@/schemas";
import { handlePrismaError } from "@/utils/prismaErrorHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const categories = await db.transactionAccount.findUnique({
      where: { userId: user.id, id: id },
      select: {
        id: true,
        name: true,
        accountNo: true,
        type: true,
      },
    });
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const PATCH = async (request: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    // Authenticate the user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const parsedBody = AccountSchema.safeParse(body);

    if (parsedBody.error) {
      return NextResponse.json(
        { error: "Invalid data", details: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { name, accountNo, type } = parsedBody.data;

    // Check if the transactionAccount exists and belongs to the userS
    const updatedtransactionAccount = await db.transactionAccount.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        name,
        accountNo,
        type,
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        accountNo: true,
        type: true,
      },
    });

    // If no rows were updated, the transactionAccount was not found or did not belong to the user
    if (!updatedtransactionAccount) {
      return NextResponse.json(
        { error: "Invaild id , or transactionAccount not found " },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: updatedtransactionAccount },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    // Authenticate the user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // Parse and validate the request body

    // Check if the transactionAccount exists and belongs to the userS
    const updatedtransactionAccount = await db.transactionAccount.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });

    // If no rows were updated, the transactionAccount was not found or did not belong to the user
    if (!updatedtransactionAccount) {
      return NextResponse.json(
        { error: "Invaild id , or transactionAccount not found " },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};
