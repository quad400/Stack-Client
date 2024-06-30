import { Link } from "react-router-dom";
import MobileToggle from "./MobileToggle";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

const MainNav = () => {
  return (
    <nav className="flex justify-between items-center px-3 md:px-6 py-1 shadow-md">
      <div className="flex justify-start items-center">
        <MobileToggle />
        <Link
          to="/workspace"
          className="text-lg text-neutral-900 hidden justify-start items-center md:flex tracking-tighter md:text-2xl font-bold ml-1"
        >
          <img src={"./logo.png"} alt="Logo" height={50} width={50} />
          Stack
        </Link>
        <Button  className="ml-2 hidden md:block">
          <div className="font-medium text-white text-sm">Create</div>
        </Button>
        <Button
          
          size="icon"
          className="ml-2 flex justify-center items-center md:hidden"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex justify-center items-center space-x-3">
        <UserButton 
        
        />
      </div>
    </nav>
  );
};

export default MainNav;
