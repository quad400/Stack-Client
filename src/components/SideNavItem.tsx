import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SideNaveItemProps {
  id: string;
  name: string;
  avatar: string;
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
  id,
  avatar,
  activeButton,
  setActiveButton,
  name,
}: SideNaveItemProps) => {
  const [expanded, seExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

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


  return (
    <Accordion type="multiple" defaultValue={accordionValue} className="w-full">
      <AccordionItem value={id}>
        <AccordionTrigger
          className="w-full hover:no-underline "
          onClick={() => handleExpand(id)}
        >
          <div className="flex no-underline space-x-2 justify-start items-center w-full">
            <img
              src={avatar}
              alt={name}
              width={30}
              height={30}
              className="rounded-lg"
            />
            <div className="text-sm truncat text-neutral-800 font-medium">
              {name}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {routes.map(({ icon: Icon, name, path }) => (
            <Button
              key={name}
              variant="ghost"
              // onClick={() => handleRoute(workspaceId, path)}
              className={cn(
                "w-full justify-start text-indigo-700 space-x-2 items-center"
                // isExpanded && path === `${pathname}` && "bg-indigo-100/50"
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
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SideNavItem;
