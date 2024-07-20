import { IMember } from "@/lib/interfaces";
import UserAvatar from "./UserAvatar";

const MemberItem = ({ member }: { member: IMember }) => {
  return (
    <div
      className="flex space-x-2 flex-row justify-between w-full items-center"
    >
      <div className="flex justify-start items-center space-x-2">
        <UserAvatar user={member?.user} containerStyle="h-10 w-10" />
        <div className="">
          <div className="text-sm text-neutral-700 font-normal">
            {member?.user?.fullName}
          </div>
          <div className="text-sm text-neutral-700 font-normal">
            @{member?.user?.email.split("@")[0]}
          </div>
        </div>
      </div>
      <div className="bg-neutral-300 text-neutral-700 font-medium text-sm p-2 rounded-sm capitalize">
        {member.role}
      </div>
    </div>
  );
};

export default MemberItem;
