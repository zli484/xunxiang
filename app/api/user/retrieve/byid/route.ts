import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const db = new PrismaClient();

  try {
    // Get email from query parameters
    const body = await req.json();
    const userId = body.userId;

    console.log("userId: " + userId);
    const userIdNumber = Number(userId);

    const user = await db.user.findUnique({
      where: {
        userId: userIdNumber,
      },
    });

    console.log("the user found is ", user);

    // Check if user exists
    if (!user) {
      return new Response('{"message": "User not found"}');
    }

    // Return the user
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.log("error is ", error);
    return new Response('{"message": "Something went wrong"}');
  } finally {
    await db.$disconnect();
  }
}
