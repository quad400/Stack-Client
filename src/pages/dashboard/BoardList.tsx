import BoardCard from "@/components/board/BoardCard";
import { GetWorkspacesDispatch } from "@/features/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IBoard } from "@/lib/interfaces";
import { Earth, Lock } from "lucide-react";
import { useEffect } from "react";

const BoardList = () => {
  const { workspaces } = useAppSelector((state) => state.workspace);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetWorkspacesDispatch());
  }, [dispatch]);

  return (
    <div className="flex w-full h-full flex-col justify-start items-start">
      <div className="text-lg text-neutral-800 font-semibold my-4">
        Your Workspaces
      </div>
      <div className="flex w-full flex-col space-y-4">
        {workspaces.map((workspace) => {
          return (
            <div className="w-full flex flex-col">
              <div className="w-full flex space-x-2 justify-start items-center">
                <img
                  src={workspace.image}
                  alt={workspace.name}
                  className="object-fill h-10 w-10 rounded-md"
                />
                <div>
                  <div className="text-base text-neutral-800 font-medium">
                    {workspace.name}
                  </div>
                  <div className="text-xs text-neutral-700 font-medium flex">
                    {workspace.isPrivate ? <Lock className="text-neutral-600 h-4 w-4 mr-1" />: <Earth className="text-neutral-600 h-4 w-4 mr-1" />}
                    {workspace.isPrivate ? "Private" : "Public"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                {workspace.boards.map((item: IBoard) => {
                  return (
                    <BoardCard
                      _id={item._id}
                      image={item.image}
                      name={item.name}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardList;
