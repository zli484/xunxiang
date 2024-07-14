import React from "react";
import { Button } from "@/components/ui/button";

export default function EditProfileButton() {
  return (
    <div>
      {" "}
      <a href="/profile/edit" className="m-1">
        <Button size={"sm"} variant={"outline"}>
          Edit Profile
        </Button>
      </a>
    </div>
  );
}
