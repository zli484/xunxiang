import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";
async function FavoriteToggleButton({
  saveReceiverUserId,
}: {
  saveReceiverUserId: string;
}) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const saveId = await fetchFavoriteId({ saveReceiverUserId });
  return (
    <FavoriteToggleForm
      saveReceiverUserId={saveReceiverUserId}
      userSaveId={saveId ? saveId.toString() : null}
    />
  );
}
export default FavoriteToggleButton;
