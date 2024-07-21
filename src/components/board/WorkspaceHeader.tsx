import ActionTooltip from "../ActionTooltop";
import { Button } from "../ui/button";
import { Earth, LockKeyhole, Pen } from "lucide-react";
import { useState } from "react";
import EditForm from "./EditForm";
import { IWorkspace } from "@/lib/interfaces";

const WorkspaceHeader = ({ workspace }: { workspace: IWorkspace }) => {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return <EditForm setIsEdit={setIsEdit} workspace={workspace} />;
  }

  return (
    <div className="space-x-2 flex justify-start items-center mb-8">
      <img
        src={workspace?.image}
        className="h-14 w-14 rounded-md bg-emerald-500"
      />
      <div className="flex flex-col justify-start items-start">
        <div className="flex text-lg font-medium space-x-2 text-neutral-800 justify-center items-center">
          <div>{workspace?.name}</div>
          <ActionTooltip content="Edit Workspace" side="right">
            <Button variant="ghost" size="icon" onClick={() => setIsEdit(true)}>
              <Pen className="h-5 w-5 text-neutral-600" />
            </Button>
          </ActionTooltip>
        </div>
        <ActionTooltip content="visibility" side="bottom">
          <div className="flex space-x-2 items-center justify-center">
            {workspace.isPrivate ? (
              <LockKeyhole className="h-4 w-4 text-neutral-500" />
            ) : (
              <Earth className="h-4 w-4 text-neutral-500" />
            )}{" "}
            <div className="text-neutral-700 text-xs">
              {workspace?.isPrivate ? "Private" : "Public"}
            </div>
          </div>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
