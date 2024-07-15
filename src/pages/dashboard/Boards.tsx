import BoardCard from "@/components/board/BoardCard";
import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/board/WorkspaceHeader";
import { IBoard } from "@/lib/interfaces";
import { User } from "lucide-react";
import NewBoard from "@/components/board/NewBoard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { WorkspaceDispatch } from "@/features/workspaceSlice";

const Boards = () => {
  const { workspace } = useAppSelector((state) => state.workspace);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!workspace) return;

    dispatch(WorkspaceDispatch(workspace));
  }, [workspace, dispatch]);

  if (!workspace) {
    return;
  }
  return (
    <div className="w-full h-full flex flex-col space-y-4 justify-start items-start">
      <WorkspaceHeader workspace={workspace} />
      <Separator className="w-full h-px" />
      <div className="flex flex-col justify-start items-start">
        <div className="flex justify-start items-end space-x-2">
          <User className="h-6 w-6 text-neutral-600" />
          <div className="text-base text-neutral-800 font-medium">
            Your Boards
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {workspace.boards.map((item: IBoard) => {
            return (
              <BoardCard _id={item._id} image={item.image} name={item.name} />
            );
          })}
          <NewBoard />
        </div>
      </div>
    </div>
  );
};

export default Boards;
