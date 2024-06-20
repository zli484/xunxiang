"use client";

import { useToast } from "../ui/use-toast";
import { signOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

function SignOutLink() {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({ description: "Error signing out." });
      return;
    }

    toast({ description: "You have been signed out." });
    router.push("/login");
  };

  return (
    <button className="w-full text-left" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default SignOutLink;

// "use client";

// import { useToast } from "../ui/use-toast";
// import { signOut } from "@/app/login/actions";
// import { createClient } from "@/utils/supabaseClient";
// import { redirect } from "next/navigation";

// function SignOutLink() {
//   const { toast } = useToast();
//   const handleLogout = () => {
//     toast({ description: "You have been signed out." });
//   };

//   const supabase = createClient();

//   return (
//     <button
//       className="w-full text-left"
//       onClick={() => {
//         supabase.auth.signOut();
//         redirect("/login");
//       }}
//     >
//       Logout
//     </button>
//   );
// }
// export default SignOutLink;
