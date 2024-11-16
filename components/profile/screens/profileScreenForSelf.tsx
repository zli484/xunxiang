"use client";

import { UserWithProfiles } from "@/lib/types";
import ProfileInfoDisplay from "../sections/profileInfoDisplay";
import BioCard from "../atoms/bioCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MentorProfileForm from "../forms/MentorProfileForm";
import MenteeProfileForm from "../forms/MenteeProfileForm";
import MenteeProfileSection from "../sections/menteeProfileSection";
import MentorProfileSection from "../sections/mentorProfileSection";
import { Toaster } from "react-hot-toast";
import QuestionsSection from "../sections/questionsSection";

export default function ProfileScreenForSelf({
  user,
  currentUser,
}: {
  user: UserWithProfiles;
  currentUser: UserWithProfiles;
}) {
  console.log("user", user);

  return (
    <div className="container mx-auto p-12">
      <Toaster position="top-right" />
      <Tabs defaultValue="basicInfo" className="flex flex-col">
        <div className="flex items-center">
          <TabsList className="m-12">
            {/* <TabsTrigger value="basicInfo">Basic Info</TabsTrigger> */}
            {/* <TabsTrigger value="mentorProfile">As Mentor</TabsTrigger>
            <TabsTrigger value="menteeProfile">As Mentee</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger> */}
          </TabsList>
        </div>
        <div>
          <TabsContent value="basicInfo">
            <ProfileInfoDisplay isSelf={true} user={user} />
          </TabsContent>

          <TabsContent value="mentorProfile">
            <div className="max-w-4xl mx-auto p-6">
              {user.mentorProfile ? (
                <div>
                  <h2>Your Mentor Profile</h2>
                  <MentorProfileSection user={user} currentUser={currentUser} />
                </div>
              ) : (
                <MentorProfileForm />
              )}
            </div>
          </TabsContent>

          <TabsContent value="menteeProfile">
            <div className="max-w-4xl mx-auto p-6">
              {user.menteeProfile ? (
                <div>
                  <h2>Your Mentee Profile</h2>
                  <MenteeProfileSection user={user} />
                </div>
              ) : (
                <MenteeProfileForm />
              )}
            </div>
          </TabsContent>

          <TabsContent value="questions">
            <QuestionsSection user={user} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// import { type User } from "@prisma/client";
// import BasicInfoCard from "../sections/profileInfoDisplay";
// import AskQuestionButton from "../../modals/askQuestionButton";
// import ConnectButton from "../sections/connectButton";
// import QuestionsSection from "../sections/questionsSection";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import BioCard from "../atoms/bioCard";
// import EditProfileButton from "../atoms/editProfileButton";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import MentorshipCard from "../sections/mentorshipCard";
// import { UserWithProfiles } from "@/lib/types";

// export default function ProfileScreenForSelf({
//   user,
// }: {
//   user: UserWithProfiles;
// }) {
//   return (
//     <>
//       <div className="h-screen">
//         <Tabs defaultValue="basicInfo" className="flex flex-col">
//           <div className="flex items-center">
//             <TabsList className="m-12">
//               <TabsTrigger value="basicInfo">Infooo</TabsTrigger>
//               {/* <TabsTrigger value="questions">Questions</TabsTrigger> */}
//               {user.isMentor && (
//                 <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
//               )}
//             </TabsList>
//           </div>
//           <div>
//             <TabsContent value="basicInfo">
//               <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
//                 <BasicInfoCard isSelf={true} user={user} />
//                 <BioCard isSelf={true} user={user} />
//               </div>
//             </TabsContent>
//             {/* <TabsContent value="questions">
//               <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
//                 <QuestionsSection userId={user.id} />
//               </div>
//             </TabsContent> */}
//             <div className="w-full">
//               {user.isMentor && (
//                 <TabsContent value="mentorship">
//                   <div className="">
//                     <MentorshipCard user={user} />
//                   </div>
//                 </TabsContent>
//               )}
//             </div>
//           </div>
//         </Tabs>
//       </div>
//     </>
//   );
// }
