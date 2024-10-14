import React from "react";
// import { Question } from "@prisma/client";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import prisma from "@/lib/services/prisma";
import { UserCard } from "../user/atoms/UserCard";
import { UserCardMini } from "../user/atoms/UserCardMini";
import AnswerQuestionModalButton from "../modals/answerQuestionModalButton";

export default async function QuestionCard(question: any) {
  const user = await prisma.user.findUnique({
    where: {
      id: question.askedByUserId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <Card
      className="sm:col-span-2 h-72 w-72 flex flex-col justify-between"
      x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader className="pb-3">
        <CardTitle> Q: {question.questionText}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed flex flex-col space-x-3 items-end">
          <div>Asked by</div>
          <UserCardMini user={user} />
          {question.answerText && (
            <div>
              <div>Answer:</div>
              <div>{question.answerText}</div>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <AnswerQuestionModalButton question={question} />
      </CardFooter>
    </Card>
    // <div>
    //   <h1>Question</h1>
    //   <p>{question.questionText}</p>
    //   <FormContainer action={submitAnswerAction}>
    //     <FormInput name="answer" label="Answer" type="text" />
    //     <input type="hidden" name="questionId" value={question.id} />

    //     <SubmitButton />
    //   </FormContainer>
    // </div>
  );
}
