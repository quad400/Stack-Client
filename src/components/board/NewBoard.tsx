import { CircleHelp } from "lucide-react";
import ActionTooltip from "../ActionTooltop";
import { useAppDispatch } from "@/hooks/useRedux";
import { ShowModal } from "@/features/workspaceSlice";

const NewBoard = () => {

  const dispatch = useAppDispatch()

  const handleOpenModal = ()=> {
    dispatch(ShowModal(true, "createBoard"))
  }

  return (
    <button onClick={handleOpenModal} className="rounded-md h-32 bg-neutral-100 hover:bg-neutral-200/80 transition relative space-y-2">
      <div className="text-neutral-700 text-sm font-medium">
        Create new board
      </div>
      <div className="text-neutral-700 text-xs font-normal">
        You have 5 board remaining
      </div>

      <ActionTooltip
        content="Upgrade to have unlimited board"
        align="start"
        side="bottom"
      >
        <CircleHelp className="h-4 w-4 text-neutral-600 bottom-2 right-2 absolute" />
      </ActionTooltip>
    </button>
  );
};

export default NewBoard;
