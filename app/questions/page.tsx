import React from "react";
import prisma from "@/lib/services/prisma";
import { getProfileUser } from "@/utils/actions";
import QuestionCard from "@/components/questions/questionCard";

export default async function QuestionsPage() {
  return <div>Questions</div>;
  // const user = await getProfileUser();
  // if (!user) {
  //   throw new Error("User not found");
  // }
  // const userId = user.userId;

  // const questions = await prisma.question.findMany({
  //   where: {
  //     askedToUserId: userId,
  //   },
  // });
  // return (
  //   <div className="flex w-1/2 mx-auto m-12">
  //     {" "}
  //     <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
  //       {questions.map((question) => (
  //         <QuestionCard key={question.id} {...question} />
  //       ))}
  //     </div>
  //     {/* <div>
  //       <h1>Questions</h1>
  //       {questions.map((question) => (
  //         <div key={question.id}>
  //           <p>{question.questionText}</p>
  //         </div>
  //       ))}
  //     </div> */}
  //   </div>
  // );
}
