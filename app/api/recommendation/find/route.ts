import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { vectorStore } from "@/lib/vector/vectorstore";

export async function POST(req: Request) {
  const db = new PrismaClient();
  const body = await req.json();

  const description = body.description;
  const topK = body.topK;

  const retriever = vectorStore.asRetriever(topK);

  if (!retriever) {
    throw new Error(`No retriever found for vector store: ${retriever}`);
  }

  // const retriever = vectorStoreInterestsAndPassions.asRetriever(10);
  const docs = await retriever.getRelevantDocuments(description);

  const userIds = docs.map((userDoc) => userDoc.metadata.userId);

  const users = await db.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });

  // Create a map of userId to user object for quick lookup
  const userIdToUserMap = new Map(users.map((user) => [user.id, user]));

  // Reorder users based on the order of userIds
  const orderedUsers = userIds.map((userId) => userIdToUserMap.get(userId));

  return NextResponse.json({ data: orderedUsers });
}
