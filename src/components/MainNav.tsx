import { Link, useNavigate } from "react-router-dom";
import MobileToggle from "./MobileToggle";
import { Button } from "./ui/button";
import { CircleHelp, LogOut, Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { ElementRef, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ActionTooltip from "@/components/ActionTooltop";
import { Logo } from "@/constants/Images";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ShowModal } from "@/features/workspaceSlice";
import UserAvatar from "./UserAvatar";
import { Separator } from "@radix-ui/react-separator";
import { Logout } from "@/features/userSlice";

const MainNav = () => {
  const searchInputRef = useRef<ElementRef<"input">>(null);

  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "/") {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleShowModal = () => {
    dispatch(ShowModal(true, "createWorkspace"));
  };

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form.handleSubmit((data) => {
    //   navigate(`/search?q=${data.search}`);
    // })();
  };

  return (
    <nav className="flex static justify-between items-center px-3 md:px-6 py-1.5 border-b">
      <div className="flex justify-start items-center">
        <MobileToggle />
        <Link
          to="/"
          className="text-lg text-neutral-700 hidden justify-start items-center md:flex tracking-tighter md:text-2xl font-semibold ml-1"
        >
          <img src={Logo} alt="Logo" height={20} width={20} />
          Stack
        </Link>
        <Button className="ml-2 hidden md:block" onClick={handleShowModal}>
          <div className="font-medium text-white text-sm">Create</div>
        </Button>
        <Button
          onClick={handleShowModal}
          size="icon"
          className="ml-2 flex justify-center items-center md:hidden"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex justify-center items-center space-x-3">
        <ActionTooltip content="Press Ctrl + /">
          <div className="relative">
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="text-neutral-600 h-5 w-5 " />
            </button>
            <form onSubmit={handleSearch}>
              <Input
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={searchInputRef}
                placeholder="Search..."
                className="text-neutral-800 focus-visible:ring-offset-0
            h-8
            focus-visible:ring-indigo-400
            md:focus:w-[500px]
            "
              />
            </form>
            {search.length > 1 && (
              <div className="py-4 px-2 space-y-2 w-[500px] top-10 left-0 right-0 bg-white shadow-lg absolute">
                <div className="text-neutral-800 font-medium text-sm">
                  Search results
                </div>
                {
                  <div className="text-neutral-700 font-normal text-sm">
                    No results found
                  </div>
                }
              </div>
            )}
          </div>
        </ActionTooltip>

        <ActionTooltip content="Information" align="end">
          <Button variant="ghost" size="icon">
            <CircleHelp className="text-neutral-800 h-5 w-5" />
          </Button>
        </ActionTooltip>

        <ActionTooltip content="Account" align="end">
          <Popover>
            <PopoverTrigger>
              <button className="hover:ring hover:ring-neutral-200 rounded-full">
                <UserAvatar user={user} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="mt-3 space-y-2 mr-2 w-[270px] px-0">
              <div className="flex justify-start space-x-2 px-2 items-center">
                <UserAvatar user={user} />
                <div className="flex flex-col justify-start items-start">
                  <div className="text-neutral-800 font-medium text-sm">
                    {user?.fullName}
                  </div>
                  <div className="text-neutral-700 font-normal text-xs">
                    {user?.email}
                  </div>
                </div>
              </div>
              <Separator className="h-px bg-neutral-200 w-full" />
              <div className="px-2">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="lg"
                  className="flex w-full space-x-3 mb-2 justify-start items-center"
                >
                  <LogOut className="text-neutral-700 h-5 w-5" />
                  <div className="text-neutral-700 font-normal text-sm">
                    Log out
                  </div>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </ActionTooltip>
      </div>
    </nav>
  );
};

export default MainNav;
