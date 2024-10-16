"use client";

import React, { useEffect, useRef, useState } from "react";
import { type User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import profile_placeholder from "@/public/img/placeholders/profile_card/male.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_MESSAGE = "Generating message suggestion, please wait...";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [getMessage, setGetMessage] = useState(true);

  const popupRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    // Close popup if user clicks outside of popup
    const handleClickOutside = (e: any) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Retrieve ChatGPT recommended message
    if (message === DEFAULT_MESSAGE && getMessage) {
      console.log(`Generating intro message for user:`, user);
      setGetMessage(false);
      fetch("/api/match/introMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          introUserId: user.id,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(await res.text());
          }
        })
        .then((res) => {
          setMessage(res.message);
        })
        .catch((err) => {
          console.log("Error retrieving intro message", err);
          setMessage(`Hello ${user.firstName}...`);
        });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Send a connection request to the viewed user
  const handleConnect = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    console.log("trying to connect to user", user);

    const response = await fetch("/api/match/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        viewedUserId: user.id,
        message,
      }),
    }).catch((err) => {
      // Parse error message. If it starts with "ERROR" then extract the message
      // and display it to the user.
      console.log("Error connecting to user", err);
      return err;
    });

    if (response.ok) {
      toast.success("Connection requested!");
      onClose();
    } else {
      let message = await response.text();
      if (message.startsWith("ERROR:")) {
        message = message.split("ERROR:")[1].trim();
      }
      toast.error(`Error connecting to user: ${message}`);
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Placeholder for Connect</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {/* <Textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          /> */}

          <div className="flex justify-end mt-12">
            {/* <Button onClick={() => onSendQuestion(question)}>
              Send Question
            </Button> */}
          </div>
        </DialogDescription>
        <DialogFooter>
          {/* Add any buttons or additional footer content here */}
        </DialogFooter>
      </DialogContent>
    </Dialog>

    // <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex items-center justify-center z-50">
    //   <div
    //     // @ts-ignore
    //     ref={popupRef}
    //     className="w-5/6 lg:w-1/2 bg-background shadow-xl rounded-xl p-4 space-y-3 bg-white"
    //   >
    //     <div className="lg:w-full pt-3">
    //       <div className="flex w-full justify-center">
    //         <h2 className="text-2xl text-center">
    //           {/* Connect to {user.firstName} */}
    //         </h2>
    //       </div>
    //       <div className="flex justify-center">
    //         <Image
    //           src={user.profilePictureURL ?? profile_placeholder}
    //           className="rounded-full"
    //           width={100}
    //           height={100}
    //           alt="UserProfile"
    //         />
    //       </div>
    //       <div className="card-body">
    //         <div>
    //           <textarea
    //             placeholder="Your connection message here..."
    //             className="w-full p-2 rounded border"
    //             rows={6}
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //           ></textarea>
    //         </div>
    //         <div className="flex flex-col lg:flex-row justify-end mt-4 space-y-3 lg:space-y-0">
    //           <Button
    //             isLoading={loading}
    //             className="btn btn-sm mx-2 text-center w-full sm:w-1/2 md:w-1/3 self-center"
    //             onClick={handleConnect}
    //           >
    //             Connect
    //           </Button>
    //           <Button
    //             isLoading={loading}
    //             className="btn btn-sm mx-2 text-center w-full sm:w-1/2 md:w-1/3 self-center"
    //             onClick={() => onClose()}
    //           >
    //             Cancel
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ConnectModal;
