import { IWorkspace } from "@/lib/interfaces";
import { Earth, Lock } from "lucide-react";

const WorkspaceTop = ({ workspace }: { workspace: IWorkspace | null }) => {
  return (
    <div className="w-full flex space-x-2 justify-start items-center">
      <img
        src={workspace?.image}
        alt={workspace?.name}
        className="object-fill h-10 w-10 rounded-md"
      />
      <div>
        <div className="text-base text-neutral-800 font-medium">
          {workspace?.name}
        </div>
        <div className="text-xs text-neutral-700 font-medium flex">
          {workspace?.isPrivate ? (
            <Lock className="text-neutral-600 h-4 w-4 mr-1" />
          ) : (
            <Earth className="text-neutral-600 h-4 w-4 mr-1" />
          )}
          {workspace?.isPrivate ? "Private" : "Public"}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceTop;
