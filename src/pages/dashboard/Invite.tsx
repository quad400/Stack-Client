import BASE_URL from "@/constants/Endpoint";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { GetWorkspacesDispatch } from "../../features/workspaceSlice";
import { RedirectedTo } from "@/features/userSlice";

const Invite = () => {
  const { inviteCode } = useParams();

  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(RedirectedTo(pathname));
      return;
    }

    (async () => {
      try {
        await axios.post(`${BASE_URL}/members/accept/${inviteCode}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("You have successfully joined this workspace");
        dispatch(GetWorkspacesDispatch());
        navigate("/workspace", { replace: true });
      } catch (error: any) {
        toast.success(error.response.data.message);
      }
    })();
  }, [token, inviteCode]);

  return (
    <div className="flex justify-center items-center bg-neutral-100 h-screen w-full">
      <div className="shadow-lg p-6 flex rounded-lg flex-col justify-center bg-white items-center">
        <div className="text-neutral-900 font-semibold text-lg">
          Verifying this workspace
        </div>
        <div className="text-neutral-800 font-normal text-sm mb-6">
          You will be redirect shortly after the verifications is done, stay
          put.
        </div>
        <Loader className="text-indigo-600 h-7 w-7 animate-spin" />
      </div>
    </div>
  );
};

export default Invite;
