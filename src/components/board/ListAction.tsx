import qs from "query-string";
import { Copy, Ellipsis, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import axios from "axios";
import { toast } from "sonner";
import NewCard from "./NewCard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import BASE_URL from "@/constants/Endpoint";
import { GetListCardDispatch } from "@/features/workspaceSlice";

const ListAction = ({ listId, name }: { listId: string; name: string }) => {
  const { workspace, board } = useAppSelector((state) => state.workspace);
  const { token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleCopyList = async () => {
    const newName = `${name} Copy`;
    try {
      if (!board) return;

      const workspaceId = board.workspaceId.toString();
      const url = qs.stringifyUrl({
        url: `${BASE_URL}/lists`,
        query: {
          workspaceId: workspaceId,
          boardId: board?._id,
        },
      });

      await axios.post(
        url,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(GetListCardDispatch(board?._id));
      toast.success("List copied successfully");
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error("Failed to copy list");
    }
  };

  const handleDeleteList = async () => {
    if (!board) return;

    const workspaceId = board.workspaceId.toString();
    try {
      const url = qs.stringifyUrl({
        url: `${BASE_URL}/lists/${listId}`,
        query: {
          workspaceId: workspaceId,
          boardId: board?._id,
        },
      });

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("List Deleted successfully");
      dispatch(GetListCardDispatch(board?._id));
      // router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete list");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <button className="hover:bg-neutral-400/10 p-1.5 rounded-md transition">
          <Ellipsis className="text-neutral-800 h-6 w-6" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom">
        <div className="text-neutral-900 text-sm font-medium text-center">
          Actions
        </div>
        <div className="flex flex-col gap-2">
          <NewCard listId={listId}>
            <Button
              variant="ghost"
              className="flex w-full justify-between items-center"
            >
              <div className="text-sm text-neutral-900 font-medium">
                Add Card
              </div>
              <Plus className="text-neutral-800 h-5 w-5" />
            </Button>
          </NewCard>
          <Button
            onClick={handleCopyList}
            variant="ghost"
            className="flex w-full justify-between items-center"
          >
            <div className="text-sm text-neutral-900 font-medium">
              Copy List
            </div>
            <Copy className="text-neutral-800 h-5 w-5" />
          </Button>
          <Separator className="w-full" />
          <Button
            onClick={handleDeleteList}
            variant="ghost"
            className="flex w-full justify-between items-center"
          >
            <div className="text-sm text-rose-900 font-medium">Delete List</div>
            <Trash className="text-rose-800 h-5 w-5" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListAction;
