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

export default function AllUserScreen({
  totalUserCount,
  allUsers,
  savedUsersIDs,
}: {
  totalUserCount: number;
  allUsers: User[];
  savedUsersIDs: number[];
}) {
  // Render your component with the fetched data
  return (
    <div className="my-24 mx-12">
      <div className="pt-32">
        <UserSection users={allUsers} savedUsersIDs={savedUsersIDs} />
      </div>
      <div className="flex justify-center">{totalUserCount} Members</div>
    </div>
  );
}
