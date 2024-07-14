import { Button } from "@chakra-ui/react";
import { BasicButton } from "@/components/form/Buttons";

export default function SearchShortcutCard({
  text,
  setInput,
}: {
  text: string;
  setInput: (input: string) => void;
}) {
  return (
    <div>
      <BasicButton
        size={"sm"}
        variant="outline"
        onClick={() => setInput(text)}
        text={text}
      ></BasicButton>
    </div>
  );
}
