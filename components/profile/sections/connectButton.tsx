"use client";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { type User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import ConnectModal from "@/components/modals/connectModal";

export default function ConnectButton({ user }: { user: User }) {
  //   const [popupUser, setPopupUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {" "}
      <div className="space-x-3">
        {/* {popupUser && (
          <ConnectPopup
            user={popupUser}
            closePopup={() => setPopupUser(null)}
          />
        )} */}

        <Button size={"sm"} onClick={onOpen}>
          Connect
        </Button>
        <ConnectModal isOpen={isOpen} onClose={onClose} user={user} />
      </div>
    </div>
  );
}
