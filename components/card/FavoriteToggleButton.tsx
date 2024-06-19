import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";
async function FavoriteToggleButton({
  saveReceiverUserId,
}: {
  saveReceiverUserId: number;
}) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const saveId = await fetchFavoriteId({ saveReceiverUserId });
  return (
    <FavoriteToggleForm
      saveReceiverUserId={saveReceiverUserId}
      userSaveId={saveId}
    />
  );
}
export default FavoriteToggleButton;
