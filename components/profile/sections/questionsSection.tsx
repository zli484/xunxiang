import React from "react";
import prisma from "@/lib/services/prisma";

export default async function QuestionsSection({ userId }: { userId: number }) {
  return <div>Questions</div>;
  // const questions = await prisma.question.findMany({
  //   where: {
  //     askedToUserId: userId,
  //   },
  // });

  // return (
  //   <div>
  //     <h1>Questions</h1>
  //     {questions.map((question) => (
  //       <div key={question.id}>
  //         <p>{question.questionText}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
}
