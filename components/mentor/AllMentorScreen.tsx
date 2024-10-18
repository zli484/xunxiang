"use client";

import { useEffect, useState, useMemo } from "react";
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
import RoleCategoryBar from "./RoleCategoryBar";

export default function AllMentorScreen({
  totalUserCount,
  allUsers,
  savedUsersIDs,
}: {
  totalUserCount: number;
  allUsers: UserWithProfiles[];
  savedUsersIDs: string[];
}) {
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const uniqueRoles = useMemo(() => {
    const roles = new Set(
      allUsers.map((user) => user.roleGroup).filter(Boolean)
    );
    return ["All", ...Array.from(roles)] as string[];
  }, [allUsers]);

  const handleRoleFilter = (role: string) => {
    if (role === "All") {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(allUsers.filter((user) => user.roleGroup === role));
    }
  };

  return (
    <div className=" container my-6 mx-12">
      <RoleCategoryBar onRoleSelect={handleRoleFilter} roles={uniqueRoles} />
      {/* <MdOutlineContactMail
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        />
        <MembersFilterModal isOpen={isOpen} onClose={onClose} /> */}
      <MentorSection users={filteredUsers} savedUsersIDs={savedUsersIDs} />
      <div className="flex justify-center">{filteredUsers.length} Members</div>
    </div>
  );
}
