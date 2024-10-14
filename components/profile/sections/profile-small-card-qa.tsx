import illustration_1 from "@/public/img/profile/work.svg";
import Image from "next/image";
// import { type UserInfoPoint } from "@prisma/client";
import { Switch } from "@chakra-ui/react";

// This section takes a list of users and display them

export default function ProfileSmallCardQA({
  userInfoPoint,
}: {
  userInfoPoint: any;
}) {
  return (
    <div className="flex flex-col min-h-96 aspect-square w-full bg-slate-50 border-2 border-slate-100 justify-between rounded-2xl">
      <div className="space-y-3 px-3">
        <div className="flex justify-start space-x-6 pt-6">
          <span className="h-8 w-6 pl-6 bg-rose-100"></span>
          <p className="font-outfit text-xl font-bold">
            {userInfoPoint.question}
          </p>
        </div>
        <div className="flex flex-col pt-8 gap-8">
          <div className="pl-12 space-y-2">
            <p className="text-xs">{userInfoPoint.answer}</p>
          </div>
        </div>
      </div>
      <div className="w-32 self-end opacity-25">
        <Image
          src={illustration_1}
          width={30}
          height={30}
          layout="responsive"
          alt="usecase_hobbies"
        />
      </div>
    </div>
  );
}
