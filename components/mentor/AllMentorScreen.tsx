"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { User } from "@prisma/client";
import UserSection from "@/components/user/sections/user-section";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";

import MembersFilterModal from "@/components/filters/filtersModal";
import { useDisclosure } from "@chakra-ui/react";
import { MdOutlineContactMail } from "react-icons/md";
import { UserWithProfiles } from "@/lib/types";
import MentorSection from "./MentorSection";

export default function AllMentorScreen({
  totalUserCount,
  allUsers,
  savedUsersIDs,
}: {
  totalUserCount: number;
  allUsers: UserWithProfiles[];
  savedUsersIDs: string[];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Render your component with the fetched data
  return (
    <div className="my-6 mx-12">
      {/* <MdOutlineContactMail
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        />
        <MembersFilterModal isOpen={isOpen} onClose={onClose} /> */}
      <MentorSection users={allUsers} savedUsersIDs={savedUsersIDs} />

      <div className="flex justify-center">{totalUserCount} Members</div>
    </div>
  );
}
