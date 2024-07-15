import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Plus, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/constants/Images";
import { Separator } from "../ui/separator";
import ActionTooltip from "../ActionTooltop";
import { boards } from "@/constants/Data";

const BoardSideBar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [active, setActive] = useState("");

  const { pathname } = useLocation();

  const { boardId } = useParams();

  useEffect(() => {
    setActive(pathname);
  }, [pathname, setActive]);

  return (
    <div
      className={cn(
        "w-80 h-screen backdrop-blur-sm z-10 bg-white/50 transition-all relative",
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
              <div className="flex space-x-2">
                <img
                  src={Logo}
                  className="h-10 w-10 rounded-md bg-emerald-500"
                />
                <div className="flex flex-col justify-start items-start">
                  <div className="flex text-lg font-medium space-x-2 text-neutral-800 justify-center items-center">
                    <div className="text-sm font-medium text-neutral-800">
                      Trello Workspace
                    </div>
                  </div>
                  <div className="text-xs font-normal text-neutral-400">
                    Free
                  </div>
                </div>
              </div>
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
                <Link
                  to={`/workspace/111/members`}
                  className="flex w-full py-2 hover:bg-neutral-200 space-x-2"
                >
                  <User className="text-neutral-600 h-5 w-5" />
                  <div className="text-neutral-700 text-sm font-medium">
                    Members
                  </div>
                </Link>
                <ActionTooltip
                  content="Add new member"
                  align="center"
                  side="right"
                >
                  <Button variant="ghost" size="icon">
                    <Plus className="text-neutral-600 h-4 w-4" />
                  </Button>
                </ActionTooltip>
              </div>
              <Link
                to={`/workspace/1131/settings`}
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
              </Link>
              <div className="flex px-2 justify-between items-center">
                <div className="text-neutral-800 font-semibold text-base">
                  Your boards
                </div>
                <ActionTooltip
                  content="Create new board"
                  align="center"
                  side="right"
                >
                  <Button variant="ghost" size="icon">
                    <Plus className="text-neutral-600 h-4 w-4" />
                  </Button>
                </ActionTooltip>
              </div>
              <div className="space-y-2 flex flex-col w-full">
                {boards.map((item) => {
                  return (
                    <Link
                      onClick={() => setActive(`/boards/${item._id}`)}
                      to={`/boards/${item?._id}`}
                      className={cn(
                        "flex justify-start items-center hover:bg-neutral-200 py-2 px-4 space-x-2",
                        pathname === `/boards/${item?._id}` && "bg-neutral-200"
                      )}
                    >
                      <img src={item.imageUri} className="h-6 w-8 rounded-sm" />
                      <div className="text-neutral-800 text-sm font-normal">
                        {item.name}
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
