import { Skeleton } from "../ui/skeleton";

const SideNavLoader = () => {
  return (
    <div className="flex flex-col space-x-2">

    <div className="flex flex-col space-y-2">
      <Skeleton className="h-10 w-[200px]" />
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-8 w-[200px]" />
    </div>
    </div>
  );
};

export default SideNavLoader;
