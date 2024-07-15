import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { IWorkspace } from "@/lib/interfaces";
import { WorkspaceDispatch } from "@/features/workspaceSlice";
import { useAppDispatch } from "@/hooks/useRedux";

interface SideNaveItemProps {
  workspace: IWorkspace;
  activeButton: any;
  setActiveButton: any;
  storageKey: string;
}

const routes = [
  {
    path: `/`,
    name: "Board",
    icon: Layout,
  },
  {
    path: `/activity`,
    name: "Activity",
    icon: Activity,
  },
  {
    path: `/settings`,
    name: "Settings",
    icon: Settings,
  },
  {
    path: `/billing`,
    name: "Billing",
    icon: CreditCard,
  },
];

const SideNavItem = ({
  storageKey,
  activeButton,
  setActiveButton,
  workspace,
}: SideNaveItemProps) => {
  const { pathname } = useLocation();

  const [expanded, seExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const dispatch = useAppDispatch();

  const accordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const handleExpand = (value: string) => {
    seExpanded((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const handleClick = (path: any) => {
    setActiveButton(`/workspace/${workspace._id}${path}`);
    dispatch(WorkspaceDispatch(workspace));
  };

  return (
    <Accordion type="multiple" defaultValue={accordionValue} className="w-full">
      <AccordionItem value={workspace._id}>
        <AccordionTrigger
          className="w-full hover:no-underline "
          onClick={() => handleExpand(workspace._id)}
        >
          <div className="flex no-underline space-x-2 justify-start items-center w-full">
            <img
              src={workspace.image}
              alt={workspace.name}
              className="rounded-xl h-10 w-10 object-fill"
            />
            <div className="text-sm truncat text-neutral-800 font-medium">
              {workspace.name}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {routes.map(({ icon: Icon, name, path }) => {
            return (
              <Link
                to={`${workspace._id}${path}`}
                key={name}
                onClick={() => handleClick(path)}
                className={cn(
                  "w-full justify-start text-indigo-700 space-x-2 flex px-4 py-3 hover:bg-indigo-100 rounded-lg items-center",
                  activeButton === `/workspace/${workspace._id}${path}` &&
                    "bg-indigo-100"
                )}
              >
                <Icon
                  className={cn(
                    "text-neutral-500 h-5 w-5"
                    // isExpanded && path === `${pathname}` && "text-indigo-700"
                  )}
                />
                <div
                  className={cn(
                    "text-neutral-800 text-sm font-normal"
                    // isExpanded && path === `${pathname}` && "text-indigo-700"
                  )}
                >
                  {name}
                </div>
              </Link>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SideNavItem;
