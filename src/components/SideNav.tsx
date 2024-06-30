// import { CreditCard, UserRound } from "lucide-react";
// import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import SideNavHeader from "./SideNavHeader";

const SideNav = () => {
  return (
   <ScrollArea className="h-full min-w-52">
      <div className="w-full h-full ">
        <SideNavHeader />

        <div className="mt-4 w-full">
          {/* {workspaces.map((workspace: IWorkspace) => (
            <SidenavItems
              key={workspace._id}
              name={workspace.name}
              imageUri={workspace.imageUri}
              storageKey="desktopMode"
              workspaceId={JSON.parse(JSON.stringify(workspace?._id))}
            />
          ))} */}
        </div>
      </div>
    </ScrollArea>

)
}

export default SideNav