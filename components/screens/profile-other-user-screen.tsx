"use client";

import { useState, useEffect } from "react";
import { type User } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ConnectPopup } from "../user/sections/connect-popup";

import user_placeholder_male from "@/public/img/placeholders/profile_card/male.png";

export default function ProfileOtherUserScreen({ user }: { user: User }) {
  const [popupUser, setPopupUser] = useState<User | null>(null);

  return (
    <>
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {popupUser && (
          <ConnectPopup
            user={popupUser}
            closePopup={() => setPopupUser(null)}
          />
        )}
        <div className="flex flex-col w-full bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
            <div className="flex flex-col aspect-square w-full h-full bg-background shadow-2xl shadow-slate-200 items-center space-y-2 rounded-2xl">
              <Image
                src={
                  user?.profilePictureURL
                    ? user.profilePictureURL
                    : user_placeholder_male
                }
                alt={`${user?.firstName}`}
                className="mx-auto h-32 w-32 rounded-full object-cover shadow m-6"
                width={128}
                height={128}
              />
              <div>
                <h2 className="text-2xl font-bold">{user?.firstName}</h2>
              </div>

              <div>
                {user?.linkedInLink && (
                  <Link href={user.linkedInLink} prefetch={false}>
                    <i className="fa-brands fa-linkedin fa-lg"></i>
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 width-full">
                <div>
                  <p className="font-thin text-xs"> School</p>
                  <p className="font-thin text-xs">{user?.school}</p>
                </div>
                <div>
                  <p className="font-thin text-xs"> Graduation Year</p>
                  <p className="font-thin text-xs">{user?.graduationYear}</p>
                </div>
                <div>
                  <p className="font-thin text-xs"> Current Company</p>
                  <p className="font-thin text-xs">{user?.currentCompany}</p>
                </div>
                <div>
                  <p className="font-thin text-xs"> Current Role</p>
                  <p className="font-thin text-xs">{user?.currentRole}</p>
                </div>
              </div>

              {/* Do not show this button if the profile is self */}

              <div className="space-x-3">
                <Button
                  colorScheme="brand"
                  size={"sm"}
                  onClick={() => setPopupUser(user)}
                >
                  Connect
                </Button>
              </div>
            </div>
            <div className="flex flex-col aspect-square w-full bg-background shadow-2xl shadow-slate-200 items-center justify-center rounded-2xl">
              <div className="p-3 self-start text-6xl text-rose-100">&#34;</div>
              <div>
                <p className="p-6 font-outfit text-sm">{user?.bio}</p>
              </div>
              <div className="p-3 self-end text-6xl text-rose-100">&#34;</div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
