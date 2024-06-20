import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/database.types";
import prisma from "@/lib/services/prisma";
import toast from "react-hot-toast";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { create } from "domain";

export async function GET(request: NextRequest) {
  console.log("entered the get route in callback");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("requestUrl", requestUrl);
  console.log("code", code);

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);
  }

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if the user does not exist in prisma, create a new user
  // if the user does exist, redirect to the user page
  // if the user does not exist, redirect to the sign up page

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    // create a new user
    if (!session?.user?.email) {
      toast.error("Please sign in to continue");
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    await prisma.user.create({
      data: {
        email: session?.user?.email,
        firstName: "",
      },
    });

    return NextResponse.redirect(new URL("/onboarding", requestUrl.origin));
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
