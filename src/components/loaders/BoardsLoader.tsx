import { Skeleton } from "../ui/skeleton";

const BoardsLoader = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <Skeleton className="h-10 w-10" />
      </div>
      <div className="flex flex-col  space-y-3">
        <div className="flex items-center mt-6 space-x-4">
          <Skeleton className="h-6 w-6 rounded-lg" />
          <Skeleton className="h-4 w-[200px] rounded-lg" />
        </div>
        <div className="flex space-x-3 justify-start items-start">
          <Skeleton className="h-[150px] w-[200px] rounded-md" />
          <Skeleton className="h-[150px] w-[200px] rounded-md" />
          <Skeleton className="h-[150px] w-[200px] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BoardsLoader;
