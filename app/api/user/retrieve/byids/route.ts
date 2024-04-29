import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const db = new PrismaClient();

  try {
    // Get email from query parameters
    const body = await req.json();
    const userIds = body.userIds;

    // turn the datatype of userIds from string to number
    const userIdNumbers = userIds.map((userId: string) => Number(userId));

    console.log("user IDs received are ", userIdNumbers);
    console.log("now searching for users in PRISMADB");

    // Given a list of userIds, find the users
    const users = await db.user.findMany({
      where: {
        userId: {
          in: userIdNumbers,
        },
      },
    });

    console.log("the users found are ", users);

    // Check if user exists
    if (!users) {
      return new Response('{"message": "User not found"}');
    }

    // Return the user
    return new Response(JSON.stringify(users));
  } catch (error) {
    console.log("error is ", error);
    return new Response('{"message": "Something went wrong"}');
  } finally {
    await db.$disconnect();
  }
}
