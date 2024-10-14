"use client";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import AskQuestionModal from "./askQuestionModal";
import { type User } from "@prisma/client";

export default function AskQuestionButton({ user }: { user: User }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <Button onClick={onOpen} size="sm">
          Ask a Question
        </Button>
        <AskQuestionModal
          isOpen={isOpen}
          onClose={onClose}
          askedToUserId={user.id}
        />
      </div>
    </div>
  );
}
