import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import { GetWorkspaceDispatch } from "@/features/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getActivities } from "@/lib/activities";
import { IActivityLog } from "@/lib/interfaces";
import { ActivityIcon, Earth, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dateFormater } from "../../lib/utils";
import ActivityLoader from "@/components/loaders/ActivityLoader";
import WorkspaceTop from "@/components/WorkspaceTop";

const Activity = () => {
  
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<IActivityLog[]>([]);
  const { workspaceId } = useParams();
  
  const { workspace } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!workspaceId) return;
    dispatch(GetWorkspaceDispatch(workspaceId));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    if (!workspaceId) return;

    (async () => {
      setLoading(true);
      const getactivities = await getActivities(workspaceId).finally(() =>
        setLoading(false)
      );

      setActivities(getactivities);
    })();
  }, [setActivities, workspaceId]);

  return (
    <div className="w-full h-full">
      <WorkspaceTop workspace={workspace} />
      <div className="mt-5 flex justify-start items-center mb-4 space-x-2">
        <ActivityIcon className="h-6 w-6 text-neutral-800" />
        <div className="text-neutral-800 text-xl font-medium">Activities</div>
      </div>
      <Separator className="h-px w-full bg-neutral-200" />

      <div className="flex flex-col mt-4 space-y-2 justify-start items-start">
        {loading && <ActivityLoader />}
        {activities?.map((activity) => {
          return (
            <div className="flex justify-start items-center space-x-1">
              <UserAvatar user={activity.user} containerStyle="h-8 w-8" />
              <div>
                <div className="flex justify-start items-center space-x-1">
                  <div className="text-neutral-800 text-sm font-semibold">
                    {activity?.user.fullName}
                  </div>
                  <div className="text-neutral-800 text-sm font-normal">{`${activity?.action.toLowerCase()}d`}</div>
                  <div className="text-neutral-800 text-sm font-normal">{`${activity?.entityType.toLowerCase()}`}</div>
                  <div className="text-neutral-800 text-sm font-medium">
                    " {`${activity?.entityTitle}`}"
                  </div>
                </div>
                <div>
                  <div className="text-neutral-600 text-xs">
                    {dateFormater(activity?.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity;
