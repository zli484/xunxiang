import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FormContainer from "../form/FormContainer";
import TextAreaInput from "../form/TextAreaInput";
// import { submitQuestionAction } from "@/utils/actions";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
// import { submitAnswerAction } from "@/utils/actions";

interface AnswerQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: any;
}

const AnswerQuestionModal: React.FC<AnswerQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{question.questionText}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {/* <FormContainer action={submitAnswerAction}>
            <TextAreaInput name="answer" labelText="Answer" />
            <input type="hidden" name="questionId" value={question.id} />

            <div className="flex justify-end mt-12">
              <SubmitButton text="Send Answer" />
     
            </div>
          </FormContainer> */}
        </DialogDescription>
        <DialogFooter>
          {/* Add any buttons or additional footer content here */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnswerQuestionModal;
