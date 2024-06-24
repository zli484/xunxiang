import React from "react";
import prisma from "@/lib/services/prisma";

export default async function QuestionsSection({ userId }: { userId: number }) {
  const questions = await prisma.question.findMany({
    where: {
      askedToUserId: userId,
    },
  });

  // fetch all questions asked to the user
  // display them in a list
  // if no questions asked, display a message

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.questionText}</p>
        </div>
      ))}
    </div>
  );
}
