import qs from "query-string";
import z from "zod";
import { Dot, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CloseModal } from "@/features/workspaceSlice";
import { Button } from "../ui/button";
import useMembers from "@/hooks/useMembers";
import ManageMemberLoader from "../loaders/ManageMemberLoader";
import { toast } from "sonner";
import axios from "axios";
import { getWorkspace, regenerateInviteCode } from "@/lib/workspaces";
import BASE_URL from "@/constants/Endpoint";
import MemberItem from "../MemberItem";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

const ManageMemberModal = () => {
  const { data, showModal, modalType } = useAppSelector(
    (state) => state.workspace
  );

  const { token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const isOpen = showModal && modalType === "manageMember";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { loading, members } = useMembers(data);

  const onCopy = async () => {
    const workspace = await getWorkspace(data);
    const link = import.meta.env.VITE_URL + "/invite/" + workspace?.inviteCode;

    navigator.clipboard.writeText(link);
    toast.success("Link copied");
  };

  const onRegenerate = async () => {
    await regenerateInviteCode(data);
    toast.success("Invite Code regenerated");
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!data) return null;

      console.log(data, "whffuh")

      const url = qs.stringifyUrl({
        url: `${BASE_URL}/members/invite`,
        query: {
          workspaceId: `${data}`,
        },
      });

      await axios.post(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.reset();
      toast.success("Invite sent");
    } catch (e: any) {
      console.error("Error sending invite:", e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(CloseModal())}>
      <DialogContent className="p-4 w-full">
        <DialogTitle className="text-neutral-800 font-semibold text-lg">
          Manage Member
        </DialogTitle>
        <div className="flex flex-col space-y-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex space-x-2"
            >
              <div className="w-full flex-1">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Invite member by email"
                          className="text-neutral-800 focus-visible:ring-offset-0
          w-full flex-1
            focus-visible:ring-indigo-400
            "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={form.formState.isSubmitting}
              >
                Share Invite
              </Button>
            </form>
          </Form>
          <div className="flex justify-start items-center space-x-2">
            <div className="h-10 w-10 justify-center items-center flex bg-neutral-300 rounded-sm">
              <Link className="text-neutral-600 h-5 w-5" />
            </div>
            <div className="flex w-full flex-col ">
              <div className="text-neutral-700 font-normal text-sm">
                Anyone with the link an join as a member
              </div>
              <div className="flex justify-start items-center">
                <button
                  onClick={onCopy}
                  className="text-sm font-medium p-1.5 text-indigo-600 hover:text-indigo-700 bg-transparent hover:bg-neutral-100"
                >
                  Copy Link
                </button>
                <Dot className="text-neutral-400" />
                <button
                  onClick={onRegenerate}
                  className="text-sm font-medium p-1.5 text-indigo-600 hover:text-indigo-700 bg-transparent hover:bg-neutral-100"
                >
                  Regenerate Link
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center space-x-2">
              <div className="text-neutral-800 font-medium text-sm">
                Workspace Members
              </div>
              <div className="bg-neutral-200 text-sm flex text-neutral-700 font-medium justify-center items-center h-6 w-6 rounded-full">
                {members?.length}
              </div>
            </div>
            <div className="flex flex-col justify-start w-full space-y-2 mt-3">
              {loading && <ManageMemberLoader />}
              {!loading &&
                members?.map((member) => {
                  return (
                   <MemberItem member={member} key={member._id} />
                  );
                })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMemberModal;
