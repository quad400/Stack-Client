import BoardCard from "@/components/board/BoardCard";
import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/board/WorkspaceHeader";
import { IBoard } from "@/lib/interfaces";
import { Layout } from "lucide-react";
import NewBoard from "@/components/board/NewBoard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { GetWorkspaceDispatch } from "@/features/workspaceSlice";
import { useParams } from "react-router-dom";
import BoardsLoader from "@/components/loaders/BoardsLoader";

const Boards = () => {
  const { workspace } = useAppSelector((state) => state.workspace);

  const { workspaceId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!workspaceId) return;
    dispatch(GetWorkspaceDispatch(workspaceId));
  }, [dispatch, workspaceId]);

  if (!workspace) {
    return <BoardsLoader />;
  }
  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <WorkspaceHeader workspace={workspace} />
      <div className="flex justify-start mb-2 items-end space-x-2">
        <Layout className="h-8 w-8 text-neutral-600" />
        <div className="text-xl text-neutral-800 font-medium">Your Boards</div>
      </div>
      <Separator className="w-full h-px" />
      <div className="flex flex-col justify-start items-start">
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
