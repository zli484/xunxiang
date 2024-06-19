// SaveButton.tsx

import { CardSubmitButton } from "@/components/form/Buttons";
import { useState } from "react";
import toast from "react-hot-toast";

interface SaveButtonProps {
  isInitiallySaved: boolean;
  userCuid: string;
}

const UserSaveButton: React.FC<SaveButtonProps> = ({
  isInitiallySaved,
  userCuid,
}) => {
  const [saved, setSaved] = useState<boolean>(isInitiallySaved);

  async function handleSaveChange(e: React.ChangeEvent<HTMLInputElement>) {
    const previousValue = saved;
    const newValue = e.target.checked;
    setSaved(newValue);

    const url = newValue ? "/api/user/save" : "/api/user/unsave";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cuid: userCuid }),
    }).then((res) => {
      if (!res.ok) {
        setSaved(previousValue); // revert back on error
        toast.error("Failed to update status");
      } else {
        toast.success(newValue ? "Saved profile" : "Unsaved profile");
      }
    });
  }

  return (
    <CardSubmitButton isFavorite={isInitiallySaved} />

    // <label className="swap">
    //   <input
    //     className="hidden"
    //     type="checkbox"
    //     onChange={handleSaveChange}
    //     checked={saved}
    //   />
    //   <i className="fa-regular fa-star fa-lg swap-off"></i>

    //   <i className="fa-solid fa-star fa-lg swap-on"></i>
    // </label>
  );
};

export default UserSaveButton;
