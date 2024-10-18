import { NextResponse } from "next/server";
import prisma from "@/lib/services/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  console.log("userId", userId);

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const questions = await prisma.question.findMany({
    where: {
      askedToUserId: userId,
    },
    include: {
      askedByUser: true,
    },
  });

  return NextResponse.json(questions);
}
