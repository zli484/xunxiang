import React from "react";
import { Stack, Icon } from "@chakra-ui/react";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function PasswordValidityBox({
  passwordValid,
}: {
  passwordValid: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
  };
}) {
  const checkMark = <Icon as={AiOutlineCheck} color="green.500" />;
  const closeMark = <Icon as={AiOutlineClose} color="red.500" />;
  return (
    <div>
      {" "}
      <div className="py-3">
        <div className="text-xs">
          {passwordValid.length ? checkMark : closeMark} At least 8 characters
        </div>
        <div className="text-xs">
          {passwordValid.uppercase ? checkMark : closeMark} Contains an
          uppercase letter
        </div>
        <div className="text-xs">
          {passwordValid.lowercase ? checkMark : closeMark} Contains a lowercase
          letter
        </div>
        <div className="text-xs">
          {passwordValid.number ? checkMark : closeMark} Contains a number
        </div>
        <div className="text-xs">
          {passwordValid.specialChar ? checkMark : closeMark} Contains a special
          character (!@#$%^&*)
        </div>
      </div>
    </div>
  );
}
