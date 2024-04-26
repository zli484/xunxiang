// File: components/UserContactInfoModal.tsx

import { User } from "@prisma/client";

import wechat_icon from "@/public/icons/icon-wechat.svg";
import email_icon from "@/public/icons/icon-email.png";
import Image from "next/image";
import {
  Card,
  Stack,
  Button,
  Heading,
  CardBody,
  Text,
  Box,
  StackDivider,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface UserContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserContactInfoModal: React.FC<UserContactInfoModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contact Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card className="flex justify-en m-6">
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <span>
                      <Image
                        src={email_icon}
                        alt="WeChat"
                        width={20}
                        height={20}
                        className="inline mr-2"
                      />
                      Email
                    </span>
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {user.email}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <span>
                      <Image
                        src={wechat_icon}
                        alt="WeChat"
                        width={20}
                        height={20}
                        className="inline mr-2"
                      />
                      WeChat
                    </span>
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {user.wechatId}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserContactInfoModal;
