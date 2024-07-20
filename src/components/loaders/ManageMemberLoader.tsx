import { Skeleton } from "../ui/skeleton";

const ManageMemberLoader = () => {
  return (
    <div className="space-y-2 w-full">
    <div className="flex space-x-2 w-full justify-between items-center">
      <div className="flex space-x-2 justify-start items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-6 w-10" />
    </div>
    <div className="flex space-x-2 w-full justify-between items-center">
      <div className="flex space-x-2 justify-start items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-6 w-10" />
    </div>
    </div>
  );
};

export default ManageMemberLoader;
