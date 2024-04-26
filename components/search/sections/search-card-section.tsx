import SearchShortcutCard from "../atoms/search-shortcut-card";
import { Button } from "@chakra-ui/react";
export default function SearchShotcutCardSection({
  setInput,
}: {
  setInput: (input: string) => void;
}) {
  return (
    <div className="flex h-16 overflow-x-auto space-x-6 mt-3 ">
      <div>💡:</div>
      <SearchShortcutCard
        text="🚀 Passionate about startups ideas in education space"
        setInput={setInput}
      />
      <SearchShortcutCard
        text="🍽️ Love food, cooking, and traveling around the world"
        setInput={setInput}
      />
      <SearchShortcutCard
        text="💼 Someone with experiences in strategy consulting"
        setInput={setInput}
      />
    </div>
  );
}
