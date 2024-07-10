import { Link } from "react-router-dom";
import MobileToggle from "./MobileToggle";
import { Button } from "./ui/button";
import { CircleHelp, Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Form, FormControl, FormItem } from "./ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/schema/search";
import { ElementRef, useEffect, useRef } from "react";

import ActionTooltip from "@/components/ActionTooltop";
// import UserAvatar from "./UserAvatar";

const MainNav = () => {
  const searchInputRef = useRef<ElementRef<"input">>(null);

  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: "",
    },
  });

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

  return (
    <nav className="flex justify-between items-center px-3 md:px-6 py-1.5 border-b">
      <div className="flex justify-start items-center">
        <MobileToggle />
        <Link
          to="/"
          className="text-lg text-neutral-700 hidden justify-start items-center md:flex tracking-tighter md:text-2xl font-semibold ml-1"
        >
          <img src={"./logo.png"} alt="Logo" height={30} width={30} />
          Stack
        </Link>
        <Button className="ml-2 hidden md:block">
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
        <Form {...form}>
          <form>
            <Controller
              name="search"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ActionTooltip content="Press Ctrl + /">
                      <div className="relative">
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          // onClick={toggleShowPassword}
                        >
                          <Search className="text-neutral-600 h-5 w-5 " />
                        </button>
                        <Input
                          ref={searchInputRef}
                          placeholder="Search..."
                          className="text-neutral-800 focus-visible:ring-offset-0
            h-8
            focus-visible:ring-indigo-400
            md:focus:w-[500px]
            "
                        />
                      </div>
                    </ActionTooltip>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <ActionTooltip content="Information" align="end">
          <Button variant="ghost" size="icon">
            <CircleHelp className="text-neutral-800 h-5 w-5" />
          </Button>
        </ActionTooltip>

        <ActionTooltip content="Account" align="end">
          <button className="rounded-full h-7 w-7 bg-indigo-900 hover:ring-1 hover:ring-offset-2 hover:ring-neutral-200">
              {/* <UserAvatar /> */
              <p className="text-base text-neutral-50 font-semibold">A</p>}
            </button>
        </ActionTooltip>
      </div>
    </nav>
  );
};

export default MainNav;
