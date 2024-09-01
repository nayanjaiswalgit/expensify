import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/user";
import { db } from "@/lib/db";
import { AccountSchema } from "@/schemas";
import { handlePrismaError } from "@/utils/prismaErrorHandler";

// export const GET = auth(function GET(req) {
//   if (req.auth) return NextResponse.json(req.auth);
//   return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
// });

export const GET = async (request: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const categories = await db.expense.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        description: true,
        date: true,

      },
    });
    return NextResponse.json({ data: categories }, { status: 200 });
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
    const parsedBody = AccountSchema.safeParse(body);

    if (parsedBody.error) {
      return NextResponse.json(
        { error: "Invalid data", details: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { name, accountNo, type } = parsedBody.data;

    // Create the new transactionAccount in the database
    const newtransactionAccount = await db.transactionAccount.create({
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

    return NextResponse.json({ data: newtransactionAccount }, { status: 201 });
  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
};
