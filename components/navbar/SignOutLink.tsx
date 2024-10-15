"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import { redirect } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

function SignOutLink() {
  const { toast } = useToast();
  const { signOut } = useClerk();
  const handleLogout = () => {
    toast({ description: "You have been signed out." });
    signOut({ redirectUrl: "/" });
  };

  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;

// "use client";

// import { useToast } from "../ui/use-toast";
// import { createClient } from "@/utils/supabaseClient";
// import { useRouter } from "next/navigation";

// function SignOutLink() {
//   const { toast } = useToast();
//   const router = useRouter();
//   const supabase = createClient();

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//       toast({ description: "Error signing out." });
//       return;
//     }

//     toast({ description: "You have been signed out." });
//     router.push("/sign-in");
//   };

//   return (
//     <button className="w-full text-left" onClick={handleLogout}>
//       Logout
//     </button>
//   );
// }

// export default SignOutLink;

// // "use client";

// // import { useToast } from "../ui/use-toast";
// // import { signOut } from "@/app/login/actions";
// // import { createClient } from "@/utils/supabaseClient";
// // import { redirect } from "next/navigation";

// // function SignOutLink() {
// //   const { toast } = useToast();
// //   const handleLogout = () => {
// //     toast({ description: "You have been signed out." });
// //   };

// //   const supabase = createClient();

// //   return (
// //     <button
// //       className="w-full text-left"
// //       onClick={() => {
// //         supabase.auth.signOut();
// //         redirect("/login");
// //       }}
// //     >
// //       Logout
// //     </button>
// //   );
// // }
// // export default SignOutLink;
