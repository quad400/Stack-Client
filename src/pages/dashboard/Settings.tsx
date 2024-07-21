import WorkspaceHeader from "@/components/board/WorkspaceHeader";
import BoardsLoader from "@/components/loaders/BoardsLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  GetWorkspaceDispatch,
  UpdateWorkspaceDispatch,
} from "@/features/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteWorkspace } from "@/lib/workspaces";
import { Check, Earth, Lock, Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Settings = () => {
  const { workspace } = useAppSelector((state) => state.workspace);
  const [isPrivate, setIsPrivate] = useState<boolean>();
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!workspaceId) return;
    dispatch(GetWorkspaceDispatch(workspaceId));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    setIsPrivate(workspace?.isPrivate);
  }, [setIsPrivate, workspace?.isPrivate]);

  if (!workspace) {
    return <BoardsLoader />;
  }

  const handleUpdate = () => {
    setIsPrivate(!isPrivate);
    const body = {
      isPrivate: isPrivate,
    };
    dispatch(UpdateWorkspaceDispatch(workspace._id, body));
  };

  const handleDelete = async () => {
    await deleteWorkspace(workspace._id);
    navigate("/workspace");
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4 justify-start items-start">
      <WorkspaceHeader workspace={workspace} />
      <div className="flex space-x-2 justify-start items-center">
        <SettingsIcon className="text-neutral-600 h-8 w-8" />
        <div className="text-xl text-neutral-800 font-semibold">Settings</div>
      </div>
      <Separator className="w-full h-px" />
      <div className="flex flex-col w-full space-y-2">
        <div className="text-base text-neutral-800 font-medium">
          Workspace Visibility
        </div>
        <div className="flex w-full justify-between items-start">
          <div className="flex space-x-2 justify-start items-start">
            {isPrivate ? (
              <Lock className="text-rose-600 h-5 w-5" />
            ) : (
              <Earth className="text-emerald-600 h-5 w-5" />
            )}
            <div className="text-neutral-800 text-sm font-normal">
              {isPrivate
                ? "Private - This Workspace is private. It's not indexed or visible to those outside the Workspace."
                : "Public - This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards."}
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <Button className="bg-neutral-200 text-neutral-800 hover:bg-neutral-300">
                Change
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="text-neutral-800 text-base text-center mb-2 font-semibold">
                Select Workspace visibility
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <div
                  onClick={handleUpdate}
                  className="flex flex-col w-full cursor-pointer hover:bg-neutral-100 p-1 rounded-sm"
                >
                  <div className="flex space-x-2">
                    <Lock className="text-rose-600 h-5 w-5" />
                    <div className="text-neutral-800 text-sm font-normal">
                      Private
                    </div>
                    {isPrivate && (
                      <Check className="text-neutral-700 h-4 w-4" />
                    )}
                  </div>
                  <div className="text-neutral-800 text-xs mt-1 font-normal">
                    This Workspace is private. It's not indexed or visible to
                    those outside the Workspace.
                  </div>
                </div>
                <div
                  onClick={handleUpdate}
                  className="flex flex-col w-full cursor-pointer hover:bg-neutral-100 p-1 rounded-sm"
                >
                  <div className="flex space-x-2">
                    <Earth className="text-emerald-600 h-5 w-5" />
                    <div className="text-neutral-800 text-sm font-normal">
                      Public
                    </div>
                    {!isPrivate && (
                      <Check className="text-neutral-700 h-4 w-4" />
                    )}
                  </div>
                  <div className="text-neutral-800 text-xs mt-1 font-normal">
                    This Workspace is public. It's visible to anyone with the
                    link and will show up in search engines like Google. Only
                    those invited to the Workspace can add and edit Workspace
                    boards.{" "}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Popover>
        <PopoverTrigger>
          <Button variant="ghost" className="text-rose-600 hover:text-rose-700">
            Delete Workspace
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="text-neutral-800 text-base text-center mb-2 font-semibold">
            Delete Workspace?
          </div>
          <div className="text-neutral-800 text-base text-center mb-2 font-medium">
            Enter the Workspace name "{workspace.name}" to delete
          </div>
          <ul className="list-disc px-3 space-y-1 w-full text-neutral-800 text-sm">
            <li>This is permanent and can't be undone.</li>
            <li>All boards in this Workspace will be closed.</li>
            <li>Board admins can reopen boards.</li>
            <li>
              Board members will not be able to interact with closed boards
            </li>
          </ul>
          <Label className="text-xs text-neutral-800 font-semibold mt-2">
            Enter the Workspace name to delete
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-neutral-800 focus-visible:ring-offset-1 focus-visible:ring-indigo-400"
          />

          <Button
            disabled={name !== workspace.name}
            onClick={handleDelete}
            variant={name !== workspace.name ? "ghost" : "destructive"}
            className="w-full mt-2"
          >
            Delete Workspace
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Settings;
