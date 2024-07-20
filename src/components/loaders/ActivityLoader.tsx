import { Skeleton } from "../ui/skeleton";

const ActivityLoader = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-start items-center space-x-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[300px] " />
          <Skeleton className="h-3 w-[100px] " />
        </div>
      </div>
      <div className="flex justify-start items-center space-x-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[300px] " />
          <Skeleton className="h-3 w-[100px] " />
        </div>
      </div>
      <div className="flex justify-start items-center space-x-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[300px] " />
          <Skeleton className="h-3 w-[100px] " />
        </div>
      </div>
    </div>
  );
};

export default ActivityLoader;
