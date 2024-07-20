import { Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SideNav from "./SideNav";
import { ScrollArea } from "./ui/scroll-area";

// import SideNav from "./dashboard/side-nav";

const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="flex md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="text-neutral-900 h-6 w-6 " />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-1/2 overflow-y-auto">
        <ScrollArea>
          <SheetClose asChild>
            <SideNav storageKey="mobile" />
          </SheetClose>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
