import { UserCard } from "../atoms/UserCard";
import { User } from "@prisma/client";

// This section takes a list of users and display them

export default function UserSection({
  users,
  savedUsersIDs = [],
}: {
  users: Array<User>;
  savedUsersIDs?: Array<number>;
}) {
  if (!users) {
    return <div>No users found</div>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-6 m-3 lg:m-12">
      {users.map((user, index) => {
        return (
          <UserCard
            key={index}
            user={user}
            isSaved={savedUsersIDs.includes(user.userId)}
          />
        );
      })}
    </div>
  );
}
