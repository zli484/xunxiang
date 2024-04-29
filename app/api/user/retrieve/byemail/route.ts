import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const db = new PrismaClient();

  try {
    // Get email from query parameters
    const body = await req.json();
    const email = body.email;

    // Check if email is provided
    if (!email || typeof email !== "string") {
      return new Response('{"message": "Email is required"}');
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // Check if user exists
    if (!user) {
      return new Response('{"message": "User not found"}');
    }

    // Return the user
    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response('{"message": "Something went wrong"}');
  } finally {
    await db.$disconnect();
  }
}
