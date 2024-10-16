import { UserWithProfiles } from "@/lib/types";
import BasicInfoCard from "../sections/profileInfoDisplay";
import BioCard from "../atoms/bioCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MentorshipCard from "../sections/mentorshipCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfileScreenForSelf({
  user,
}: {
  user: UserWithProfiles;
}) {
  return (
    <div className="h-screen">
      <Tabs defaultValue="basicInfo" className="flex flex-col">
        <div className="flex items-center">
          <TabsList className="m-12">
            <TabsTrigger value="basicInfo">Basic Info</TabsTrigger>
            <TabsTrigger value="mentorProfile">Mentor Profile</TabsTrigger>
            <TabsTrigger value="menteeProfile">Mentee Profile</TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent value="basicInfo">
            <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
              <BasicInfoCard isSelf={true} user={user} />
              <BioCard isSelf={true} user={user} />
            </div>
          </TabsContent>

          <TabsContent value="mentorProfile">
            <div className="max-w-4xl mx-auto p-6">
              {user.mentorProfile ? (
                <MentorshipCard user={user} />
              ) : (
                <div className="text-center">
                  <p className="mb-4">Your mentor profile is not set up yet.</p>
                  <Link href="/mentor-profile/create" passHref>
                    <Button>Create Mentor Profile</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="menteeProfile">
            <div className="max-w-4xl mx-auto p-6">
              {user.menteeProfile ? (
                <MentorshipCard user={user} />
              ) : (
                <div className="text-center">
                  <p className="mb-4">Your mentee profile is not set up yet.</p>
                  <Link href="/mentee-profile/create" passHref>
                    <Button>Create Mentee Profile</Button>
                  </Link>
                </div>
              )}
            </div>
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
