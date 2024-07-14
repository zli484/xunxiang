"use client";

import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/Buttons";

type FavoriteToggleFormProps = {
  saveReceiverUserId: number;
  userSaveId: number | null;
};

function FavoriteToggleForm({
  saveReceiverUserId,
  userSaveId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    saveReceiverUserId,
    userSaveId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={userSaveId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;
