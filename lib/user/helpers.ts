import prisma from "../services/prisma";
import { User } from "@prisma/client";

export async function fetchUserByEmailHelper(
  email: string
): Promise<User | null> {
  // retrieve the user from Prisma using the email
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function fetchUserByIdHelper(
  userId: number
): Promise<User | null> {
  // retrieve the user from Prisma using the userId
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });

  return user;
}
