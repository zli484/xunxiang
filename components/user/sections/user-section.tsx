import { UserCard } from "../atoms/UserCard";
import { User } from "@prisma/client";

// This section takes a list of users and display them

export default function UserSection({
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
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
