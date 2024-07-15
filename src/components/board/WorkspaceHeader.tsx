import { Logo } from "@/constants/Images";
import ActionTooltip from "../ActionTooltop";
import { Button } from "../ui/button";
import { LockKeyhole, Pen } from "lucide-react";
import { useState } from "react";
import EditForm from "./EditForm";

const WorkspaceHeader = () => {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return <EditForm setIsEdit={setIsEdit} />;
  }

  return (
    <div className="space-x-2 flex justify-start items-center mb-8">
      <img src={Logo} className="h-14 w-14 rounded-md bg-emerald-500" />
      <div className="flex flex-col justify-start items-start">
        <div className="flex text-lg font-medium space-x-2 text-neutral-800 justify-center items-center">
          <div>Trello Workspace</div>
          <ActionTooltip content="Edit Workspace" side="right">
            <Button variant="ghost" size="icon" onClick={() => setIsEdit(true)}>
              <Pen className="h-5 w-5 text-neutral-600" />
            </Button>
          </ActionTooltip>
        </div>
        <ActionTooltip content="visibility" side="bottom">
          <div className="flex space-x-2 items-center justify-center">
            <LockKeyhole className="h-3 w-3 text-neutral-500" />
            <div className="text-neutral-700 text-xs">Private</div>
          </div>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
