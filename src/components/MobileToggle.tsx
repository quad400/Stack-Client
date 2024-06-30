import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// import SideNav from "./dashboard/side-nav";

const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="flex md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="text-neutral-900 h-6 w-6 " />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-full overflow-scroll">
        {/* <SideNav /> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
