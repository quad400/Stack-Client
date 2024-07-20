import { Banner } from "@/constants/Images";

const WorkspaceHome = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="min-w-3/5 shadow-lg rounded-lg space-y-2">
        <img
          src={Banner}
          alt="Banner"
          className="w-full object-cover rounded-t-lg"
        />
        <div className="flex justify-center items-center flex-col p-3">
          <div className="text-neutral-800 text-base font-semibold">
            Stay on track and up to date
          </div>
          <div className="text-neutral-800 text-sm font-normal text-center">
            Invite people to boards and cards, leave comments, add due dates,
            and we'll show the most important activity here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHome;
