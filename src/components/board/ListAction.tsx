"use client";

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
import { useParams, useNavigation } from "react-router-dom";
import NewCard from "./NewCard";

const ListAction = ({ listId, name }: { listId: string; name: string }) => {
  const navigation = useNavigation();
  const { boardId } = useParams();

  const handleCopyList = async () => {
    const newName = `${name} Copy`;
    try {
      const url = qs.stringifyUrl({
        url: "/api/workspaces/board/list",
        query: {
          boardId: boardId,
        },
      });

      await axios.post(url, { name: newName });
      toast.success("List Copied successfully");
      // router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to copy list");
    }
  };

  const handleDeleteList = async () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/workspaces/board/list",
        query: {
          boardId: boardId,
          listId: listId,
        },
      });

      await axios.delete(url);
      toast.success("List Deleted successfully");
      // router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete list");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" size="icon">
          <Ellipsis className="text-neutral-800 h-6 w-6" />
        </Button>
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
