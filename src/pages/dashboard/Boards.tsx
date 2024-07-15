import ActionTooltip from "@/components/ActionTooltop";
import BoardCard from "@/components/board/BoardCard";
import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/board/WorkspaceHeader";
import { boards } from "@/constants/Data";
import { IBoard } from "@/lib/interfaces";
import { CircleHelp, User } from "lucide-react";
import NewBoard from "@/components/board/NewBoard";

const Boards = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-4 justify-start items-start">
      <WorkspaceHeader />
      <Separator className="w-full h-px" />
      <div className="flex flex-col justify-start items-start">
        <div className="flex justify-start items-end space-x-2">
          <User className="h-6 w-6 text-neutral-600" />
          <div className="text-base text-neutral-800 font-medium">
            Your Boards
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {boards.map((item: IBoard) => {
            return (
              <BoardCard
                _id={item._id}
                imageUri={item.imageUri}
                name={item.name}
              />
            );
          })}
          <NewBoard />
        </div>
      </div>
    </div>
  );
};

export default Boards;
