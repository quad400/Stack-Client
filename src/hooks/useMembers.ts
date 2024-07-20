import { IMember } from "@/lib/interfaces";
import { getMembers } from "@/lib/members";
import { useEffect, useState } from "react";

const useMembers = (workspaceId: any) => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!workspaceId) {
      return;
    }
    setLoading(true);
    getMembers(workspaceId)
      .then((res) => setMembers(res))
      .finally(() => setLoading(false));
  }, [setMembers, workspaceId]);



  return {
    loading,
    members,
  };
};

export default useMembers;
