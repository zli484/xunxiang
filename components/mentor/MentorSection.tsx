import { UserWithProfiles } from "@/lib/types";
import MentorCard from "./mentorCard";

// This section takes a list of users and display them

export default function MentorSection({
  users,
  savedUsersIDs = [],
}: {
  users: Array<UserWithProfiles>;
  savedUsersIDs?: Array<string>;
}) {
  if (!users) {
    return <div>No users found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 px-12">
        {users.map((user, index) => {
          return <MentorCard key={index} user={user} />;
        })}
      </div>
    </div>
  );
}
