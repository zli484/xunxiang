import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface MentorshipRequestModalProps {
  mentorUserId: string;
  onClose: () => void;
}

export default function MentorshipRequestModal({
  mentorUserId,
  onClose,
}: MentorshipRequestModalProps) {
  const { toast } = useToast();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/mentorship/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorUserId, message }),
      });

      if (response.ok) {
        // Handle successful submission
        onClose();
      } else {
        throw new Error("Failed to submit mentorship application");
      }
    } catch (error) {
      console.error("Error submitting mentorship application:", error);
      // Handle error (e.g., show error message to user)
      toast({
        title: "Error",
        description: "Failed to submit mentorship application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for Mentorship</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block mb-2">
              Why do you want to be mentored by this person?
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
