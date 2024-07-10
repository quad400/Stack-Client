import { Home, LayoutDashboard, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import SideNavItem from "./SideNavItem";

const SideNav = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex flex-col space-y-4 h-full min-w-52 items-center justify-between">
      <div className="w-full space-y-2">
        <Button
          onClick={() => handleButtonClick("boards")}
          variant="ghost"
          className={cn(
            "flex w-full space-x-2 justify-start",
            activeButton === "boards" && "bg-indigo-100"
          )}
        >
          <LayoutDashboard className="text-neutral-700 h-5 w-5" />
          <div
            className={cn(
              "text-neutral-800 text-sm font-medium",
              activeButton === "boards" && "text-indigo-600"
            )}
          >
            Boards
          </div>
        </Button>
        <Button
          onClick={() => handleButtonClick("home")}
          variant="ghost"
          className={cn(
            "flex w-full space-x-2 justify-start",
            activeButton === "home" && "bg-indigo-100"
          )}
        >
          <Home className="text-neutral-700 h-5 w-5" />
          <div
            className={cn(
              "text-neutral-800 text-sm font-medium",
              activeButton === "home" && "text-indigo-600"
            )}
          >
            Home
          </div>
        </Button>
      </div>
      <Separator className="text-neutral-400 w-full h-[1px]" />
      <div className="flex flex-col justify-start items-start w-full">
        <div className="text-xs text-neutral-500 font-normal">Workspaces</div>
        <ScrollArea className="space-y-2 mt-2 w-full">
          <SideNavItem
            id="1"
            storageKey="desktop"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            avatar="./logo.png"
            name="First app"
            />
          <SideNavItem
            id="2"
            storageKey="desktop"
            activeButton={activeButton}
            avatar="./logo.png"
            setActiveButton={setActiveButton}
            name="First aaadpp"
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideNav;
