import BASE_URL from "@/constants/Endpoint";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Verify = () => {
  const { verifyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await axios.post(`${BASE_URL}/users/activate/${verifyId}`);
        toast.success("User sucessfully verified");
        navigate("/login", {replace: true});
      } catch (error: any) {
        toast.success(error.response.data.message);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center items-center bg-neutral-100 h-screen w-full">
      <div className="shadow-lg p-6 flex rounded-lg flex-col justify-center bg-white items-center">
        <div className="text-neutral-900 font-semibold text-lg">
          Verifying this account
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

export default Verify;
