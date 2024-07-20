import { Home } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import SideNavItem from "./SideNavItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { GetWorkspacesDispatch } from "@/features/workspaceSlice";
import { ScrollArea } from "./ui/scroll-area";

const SideNav = ({storageKey}:{storageKey: string}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  const dispatch = useAppDispatch();

  const { workspaces } = useAppSelector((state) => state.workspace);

  const { pathname } = useLocation();

  useEffect(() => {
    setActive(pathname);
  }, [pathname, setActive]);

  useEffect(() => {
    dispatch(GetWorkspacesDispatch());
  }, [dispatch]);

  const handleButtonClick = (buttonName: string) => {
    setActive(`/workspace${buttonName}`);
    navigate(`/workspace${buttonName}`);
  };

  return (
    <ScrollArea>
      <div className="flex flex-col space-y-4 h-full w-52 items-center justify-start">
        <div className="w-full space-y-2">
        
          <Button
            onClick={() => handleButtonClick("")}
            variant="ghost"
            className={cn(
              "flex w-full space-x-2 justify-start",
              active === "/workspace" && "bg-indigo-100"
            )}
          >
            <Home className="text-neutral-700 h-5 w-5" />
            <div
              className={cn(
                "text-neutral-800 text-sm font-medium",
                active === "/workspace" && "text-indigo-600"
              )}
            >
              Boards
            </div>
          </Button>
        </div>
        <Separator className="text-neutral-400 w-full h-[1px]" />
        <div className="flex flex-col justify-start items-start w-full">
          <div className="text-xs text-neutral-500 font-normal">Workspaces</div>
          {workspaces.map((workspace) => (
            <SideNavItem
              key={workspace._id}
              workspace={workspace}
              storageKey={storageKey}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default SideNav;
