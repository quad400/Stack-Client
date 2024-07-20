import { Skeleton } from "../ui/skeleton";

const BoardDetailLoader = () => {
  return (
    <div className="flex justify-start gap-3 items-start mt-20 ml-10 flex-wrap">
      <div className="bg-neutral-100/50 p-3 rounded-lg">
        <div className="flex flex-col justify-center space-y-2 w-[250px] items-center ">
          <div className="flex justify-between w-[250px] items-center">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-6 w-6" />
          </div>

          <Skeleton className="h-[30px] w-[250px]" />
          <Skeleton className="h-[30px] w-[250px]" />
          <Skeleton className="h-[30px] w-[250px]" />
        </div>
      </div>
      <div className="bg-neutral-100/50 p-3 rounded-lg">
        <div className="flex flex-col justify-center space-y-2 w-[250px] items-center ">
          <div className="flex justify-between w-[250px] items-center">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-6 w-6" />
          </div>

          <Skeleton className="h-[30px] w-[250px]" />
          <Skeleton className="h-[30px] w-[250px]" />
          <Skeleton className="h-[30px] w-[250px]" />
        </div>
      </div>
      <Skeleton className="h-[30px] w-[250px]" />
    </div>
  );
};

export default BoardDetailLoader;
