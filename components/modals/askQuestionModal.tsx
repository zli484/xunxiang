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

interface AskQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  askedToUserId?: string;
}

const AskQuestionModal: React.FC<AskQuestionProps> = ({
  isOpen,
  onClose,
  askedToUserId,
}) => {
  const [question, setQuestion] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask A Question</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {/* <FormContainer action={submitQuestionAction}>
            <TextAreaInput
              name="question"
              labelText="Question"
              defaultValue={question}
            />
            <input type="hidden" name="askedToUserId" value={askedToUserId} />

            <div className="flex justify-end mt-12">
              <Button type="submit" onClick={() => onClose}>
                Send Question
              </Button>
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

export default AskQuestionModal;
