import ManageMemberLoader from "@/components/loaders/ManageMemberLoader";
import MemberItem from "@/components/MemberItem";
import { Separator } from "@/components/ui/separator";
import WorkspaceTop from "@/components/WorkspaceTop";
import { GetWorkspaceDispatch } from "@/features/workspaceSlice";
import useMembers from "@/hooks/useMembers";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Users } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Members = () => {
  const { workspaceId } = useParams();

  const { workspace } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!workspaceId) return;
    dispatch(GetWorkspaceDispatch(workspaceId));
  }, [dispatch, workspaceId]);

  const { loading, members } = useMembers(workspaceId);

  return (
    <div className="w-full h-full">
      <WorkspaceTop workspace={workspace} />
      <div className="mt-5 flex justify-start items-center mb-4 space-x-2">
        <Users className="h-6 w-6 text-neutral-800" />
        <div className="text-neutral-800 text-xl font-medium">Members</div>
      </div>
      <Separator className="h-px w-full bg-neutral-200" />

      <div className="flex flex-col mt-4 space-y-2 justify-start items-start">
        {loading && <ManageMemberLoader />}
        {members?.map((member) => {
          return <MemberItem member={member} key={member._id} />;
        })}
      </div>
    </div>
  );
};

export default Members;
