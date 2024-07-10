import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/interfaces";

const UserAvatar = ({ user }: { user: IUser }) => {
  return (
    <Avatar>
      <AvatarImage src={user.avatar} />
      <AvatarFallback>
        {user.fullName.slice(0, 2).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
