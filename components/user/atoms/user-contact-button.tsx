// ContactButton.tsx

import { Button } from "@chakra-ui/react";

interface ContactButtonProps {
  onOpen: () => void;
}

const UserContactButton: React.FC<ContactButtonProps> = ({ onOpen }) => {
  return (
    <Button onClick={onOpen} variant="ghost" colorScheme="pink" size="sm">
      Contact
    </Button>
  );
};

export default UserContactButton;
