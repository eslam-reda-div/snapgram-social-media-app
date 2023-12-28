import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { FollowButton } from "../ui/FollowButton";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const { user: currentUser } = useUserContext();

  // console.log(currentUser);

  return (
    <div className="user-card">
      <Link to={`/profile/${user.$id}`} className="rounded-full w-14 h-14 overflow-hidden">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-14 h-14"
        />
      </Link>

      <Link to={`/profile/${user.$id}`} className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </Link>

      <FollowButton currentUser={currentUser} user={user}  type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </FollowButton>
    </div>
  );
};

export default UserCard;
