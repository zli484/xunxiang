"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionWithUser, UserWithProfiles } from "@/lib/types";
import { User } from "@prisma/client";

export default function QuestionsSection({ user }: { user: User }) {
  const [questions, setQuestions] = useState<QuestionWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions?userId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [user.id]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Questions & Answers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => (
          <Card
            key={question.id}
            className="overflow-hidden h-96 flex flex-col"
          >
            <CardHeader className="bg-gray-100 flex-shrink-0">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={question.askedByUser.profilePictureURL ?? ""}
                    alt={question.askedByUser.firstName ?? ""}
                  />
                  <AvatarFallback>
                    {question.askedByUser.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {question.askedByUser.firstName} asked:
                  </p>
                  <p className="text-lg font-medium">{question.question}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 flex-grow overflow-y-auto">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={user.profilePictureURL ?? ""}
                    alt={user.firstName ?? ""}
                  />
                  <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">Answer:</h3>
                  <p>{question.answer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
