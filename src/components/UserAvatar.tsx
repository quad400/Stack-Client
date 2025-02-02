import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

const UserAvatar = ({
  user,
  containerStyle,
}: {
  user: IUser | null;
  containerStyle?: string;
}) => {
  return (
    <Avatar className={cn("h-7 w-7", containerStyle)}>
      {user?.avatar ? (
        <AvatarImage src={user.avatar} />
      ) : (
        <AvatarFallback className="bg-violet-900 text-[12px] text-neutral-50 font=medium">
          {user?.fullName.slice(0, 2).toLocaleUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
