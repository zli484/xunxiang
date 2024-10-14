import { UserCard } from "../atoms/UserCard";
import { User } from "@prisma/client";

// This section takes a list of users and display them

export default function UserSectionRecentJoins({
  users,
  savedUsersIDs = [],
}: {
  users: Array<User>;
  savedUsersIDs?: Array<string>;
}) {
  if (!users) {
    return <div>No users found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-12 ">
      {users.map((user, index) => {
        return (
          <UserCard
            key={index}
            user={user}
            isSaved={savedUsersIDs.includes(user.id)}
          />
        );
      })}
    </div>
  );
}
