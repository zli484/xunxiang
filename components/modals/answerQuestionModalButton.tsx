"use client";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

import { type User } from "@prisma/client";
import AnswerQuestionModal from "./answerQuestionModal";

export default function AnswerQuestionModalButton({
  question,
}: {
  question: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2">
        <Button onClick={onOpen} size="sm">
          Answer Question
        </Button>
        <AnswerQuestionModal
          isOpen={isOpen}
          onClose={onClose}
          question={question}
        />
      </div>
    </div>
  );
}
