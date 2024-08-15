import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { CategorySchema } from "@/schemas";
import { handlePrismaError } from "@/utils/prismaErrorHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const categories = await db.category.findUnique({
      where: { userId: user.id, id: id },
      select: {
        id: true,
        name: true,
        image: true,
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
    const parsedBody = CategorySchema.safeParse(body);

    if (parsedBody.error) {
      return NextResponse.json(
        { error: "Invalid data", details: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { name, image } = parsedBody.data;

    // Check if the category exists and belongs to the userS
    const updatedCategory = await db.category.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        name: name,
        image: image,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    // If no rows were updated, the category was not found or did not belong to the user
    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Invaild id , or category not found " },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updatedCategory }, { status: 200 });
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

    // Check if the category exists and belongs to the userS
    const updatedCategory = await db.category.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });

    // If no rows were updated, the category was not found or did not belong to the user
    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Invaild id , or category not found " },
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
