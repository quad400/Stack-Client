import { Loader } from "lucide-react";

const Verify = () => {
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
