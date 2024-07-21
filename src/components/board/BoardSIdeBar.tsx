import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Plus, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import ActionTooltip from "../ActionTooltop";
import { getWorkspace } from "@/lib/workspaces";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IWorkspace } from "@/lib/interfaces";
import { ShowModal } from "@/features/workspaceSlice";

const BoardSideBar = () => {
  const [showSheet, setShowSheet] = useState(true);
  const [active, setActive] = useState("");
  const [workspace, setWorkspace] = useState<IWorkspace>();
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.workspace);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname);
  }, [pathname, setActive]);

  useEffect(() => {
    if (!board) return;

    getWorkspace(board?.workspaceId.toString()).then((res) => {
      setWorkspace(res);
    });
  }, [board, setWorkspace]);

  const handleMember = () => {
    dispatch(
      ShowModal(
        true,
        "manageMember",
        undefined,
        board?.workspaceId as unknown as unknown as string
      )
    );
  };

  return (
    <div
      className={cn(
        "w-80 h-screen sticky top-0 backdrop-blur-lg z-10 bg-white/50 transition-all",
        !showSheet && "w-6"
      )}
    >
      {!showSheet && (
        <button
          onClick={() => setShowSheet(!showSheet)}
          className="rounded-full p-1 absolute z-20 hover:bg-neutral-200 transition bg-neutral-100 ring-[1px] ring-neutral-200 top-4 -right-2"
        >
          <ChevronRight className="text-neutral-600 h-4 w-4" />
        </button>
      )}

      {showSheet && (
        <>
          <div className="flex flex-col transition w-full justify-start items-start">
            <div className="flex w-full p-3 justify-between">
              <Link
                to={`/workspace/${workspace?._id}`}
                className="flex space-x-2"
              >
                <img
                  src={workspace?.image}
                  className="h-8 w-8 rounded-md bg-emerald-500 object-fill aspect-square"
                />
                <div className="flex flex-col justify-start items-start w-52 truncate pr-6">
                  <div className="flex text-lg font-medium space-x-2 text-neutral-800 justify-center items-center">
                    <div className="text-base font-medium text-neutral-800">
                      {workspace?.name}
                    </div>
                  </div>
                  <div className="text-xs font-normal text-neutral-600">
                    {workspace?.isPrivate ? "Private" : "Public"}
                  </div>
                </div>
              </Link>
              <button
                className="px-2 rounded-full hover:bg-neutral-200 transition"
                onClick={() => setShowSheet(!showSheet)}
              >
                <ChevronLeft className="h-5 w-5 text-neutral-600" />
              </button>
            </div>
          </div>

          <Separator className="w-full h-[1px]" />

          <div className="flex mt-2 flex-col w-full">
            <div className="flex flex-col w-full space-y-2">
              <div className="flex justify-between px-2 items-center w-full">
                {/* <ActionTooltip
                  content="Add new member"
                  align="center"
                  side="right"
                > */}
                <button
                  onClick={handleMember}
                  className="flex w-full py-2 pr-2 pl-1 hover:bg-neutral-200 space-x-2 justify-between items-center"
                >
                  <div className="flex space-x-2 justify-start items-center">
                    <User className="text-neutral-600 h-5 w-5" />
                    <div className="text-neutral-700 text-sm font-medium">
                      Members
                    </div>
                  </div>
                  <Plus className="text-neutral-600 h-4 w-4" />
                </button>
                {/* </ActionTooltip> */}
              </div>
              <button
                onClick={() =>
                  navigate(`/workspace/${board?.workspaceId}/settings`)
                }
                className="flex w-full px-2 hover:bg-neutral-200 justify-between items-center space-x-2"
              >
                <div className="flex justify-center space-x-2 items-center">
                  <Settings className="text-neutral-600 h-5 w-5" />
                  <div className="text-neutral-700 text-sm font-medium">
                    Workspace Settings
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="text-neutral-600 h-4 w-4" />
                </Button>
              </button>
              <div className="flex px-2 justify-between items-center">
                <div className="text-neutral-800 font-semibold text-base">
                  Your boards
                </div>
                <ActionTooltip
                  content="Create new board"
                  align="center"
                  side="right"
                >
                  <Button
                    onClick={() => dispatch(ShowModal(true, "createBoard"))}
                    variant="ghost"
                    size="icon"
                  >
                    <Plus className="text-neutral-600 h-4 w-4" />
                  </Button>
                </ActionTooltip>
              </div>
              <div className="space-y-2 flex flex-col w-full">
                {workspace?.boards.map((item) => {
                  return (
                    <Link
                      onClick={() => setActive(`/boards/${item?._id}`)}
                      to={`/boards/${item?._id}`}
                      className={cn(
                        "flex justify-start items-center hover:bg-neutral-200 py-2 px-4 space-x-2",
                        active === `/boards/${item?._id}` && "bg-neutral-200/50"
                      )}
                    >
                      <img src={item?.image} className="h-6 w-8 rounded-sm" />
                      <div className="text-neutral-800 text-sm font-normal">
                        {item?.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BoardSideBar;
