import { Button } from "@chakra-ui/react";

export default function SearchShortcutCard({
  text,
  setInput,
}: {
  text: string;
  setInput: (input: string) => void;
}) {
  return (
    <div>
      <Button
        bg={"pink.50"}
        color={"pink.300"}
        size={"sm"}
        variant={"outline"}
        onClick={() => setInput(text)}
      >
        {text}
      </Button>
    </div>
  );
}
