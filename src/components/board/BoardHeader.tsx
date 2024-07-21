import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField } from "../ui/form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { ElementRef, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Share2, Trash } from "lucide-react";
import ActionTooltip from "../ActionTooltop";
import BASE_URL from "@/constants/Endpoint";
import axios from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { GetWorkspaceDispatch, ShowModal } from "@/features/workspaceSlice";

const formSchema = z.object({
  name: z.string(),
});

const BoardHeader = ({ name }: { name: string | undefined }) => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { board } = useAppSelector((state) => state.workspace);
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!name) return;
    form.setValue("name", name);
  }, [form, name]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!board) return;

    const workspaceId = board.workspaceId.toString();
    const url = qs.stringifyUrl({
      url: `${BASE_URL}/boards/${boardId}`,
      query: {
        workspaceId: workspaceId,
      },
    });
    try {
      await axios.patch(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      inputRef.current?.blur();
      toast.success("Board name updated");
      dispatch(GetWorkspaceDispatch(workspaceId));
    } catch (error) {
      console.log(error);
      toast.error("Error updating board name");
    }
  };

  const handleDelete = async () => {
    if (!board) return;

    const workspaceId = board.workspaceId.toString();

    const url = qs.stringifyUrl({
      url: `${BASE_URL}/boards/${boardId}`,
      query: {
        workspaceId: workspaceId,
      },
    });

    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successfully deleted board");
      navigate(`/workspace/${workspaceId}`);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting board");
    }
  };

  const handleShare = () => {
    dispatch(
      ShowModal(
        true,
        "manageMember",
        undefined,
        board?.workspaceId as unknown as unknown as string
      )
    );
  };

  return (
    <div className="bg-white/30 w-full sticky top-0 backdrop-blur-sm pr-4">
      <div className="flex flex-row justify-between items-center flex-wrap py-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center ml-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    ref={inputRef}
                    id="name"
                    autoComplete="off"
                    defaultValue={name}
                    className="text-neutral-800 text-lg cursor-pointer hover:bg-white/50 focus-visible:ring-offset-1 bg-transparent focus:bg-white h-8 focus-visible:ring-indigo-400 py-0 border-0"
                  />
                </FormControl>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-end items-center space-x-4">
          <ActionTooltip content="Share" align="end" side="bottom">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="text-neutral-400 h-6 w-6" />
            </Button>
          </ActionTooltip>
          <ActionTooltip content="Delete" align="end" side="bottom">
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash className="text-rose-500 h-6 w-6" />
            </Button>
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
