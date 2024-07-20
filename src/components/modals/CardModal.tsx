import z from "zod";
import qs from "query-string";
import { AlignLeft, Copy, Layout, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CloseModal, GetListCardDispatch } from "@/features/workspaceSlice";
import { getListById } from "@/lib/workspaces";
import { IList } from "@/lib/interfaces";
import BASE_URL from "@/constants/Endpoint";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Card name is required",
  }),
  description: z.string().optional(),
});

const CardModal = () => {
  const { data, showModal, modalType, board } = useAppSelector(
    (state) => state.workspace
  );

  const { token } = useAppSelector((state) => state.user);
  
  const dispatch = useAppDispatch();
  const [list, setList] = useState<IList>();
  const isOpen = showModal && modalType === "cardModal";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    form.setValue("name", data?.name || "");
    form.setValue("description", data?.description || "");
  }, [form, data]);

  useEffect(() => {
    // if (!data) return;
    getListById(data?.listId).then((res) => {
      setList(res);
    });
  }, [data, isOpen, setList]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!board) return;

      const url = qs.stringifyUrl({
        url: `${BASE_URL}/cards/${data?._id}`,
        query: {
          workspaceId: board.workspaceId.toString(),
        },
      });
      await axios.patch(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(GetListCardDispatch(board?._id));
      toast.success("Card updated successfully");

      dispatch(CloseModal());
    } catch (err) {
      toast.error("Error updating card");
    }
  };

  const handelCopy = async () => {
    try {
      if (!board) return;
      const url = qs.stringifyUrl({
        url: `${BASE_URL}/cards`,
        query: {
          workspaceId: board?.workspaceId.toString(),
          listId: data?.listId.toString(),
        },
      });

      const value = {
        name: `${data?.name} Copy`,
        description: data?.description,
      };

      await axios.post(url, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Card created successfully");

      dispatch(GetListCardDispatch(board?._id));

      form.reset();
      dispatch(CloseModal());
    } catch (err) {
      toast.error("Error copying card");
    }
  };

  const handelDelete = async () => {
    try {
      if (!board) return;
      const url = qs.stringifyUrl({
        url: `${BASE_URL}/cards/${data?._id}`,
        query: {
          workspaceId: board?.workspaceId.toString(),
          listId: data?.listId.toString(),
        },
      });

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Card deleted successfully");

      dispatch(GetListCardDispatch(board?._id));

      form.reset();
      dispatch(CloseModal());
    } catch (err) {
      toast.error("Error deleting card");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(CloseModal())}>
      <DialogContent className="p-4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex space-x-3 justify-start items-start flex-row w-full">
              <Layout className="text-neutral-700 h-6 w-6" />
              <div className="flex flex-col">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoFocus={false}
                          className="ring-0 m-0 h-6 border-0 text-lg p-0 font-semibold text-neutral-900 focus-visible:ring-0 focus-visible:border-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-xs font-normal text-neutral-500">
                  in list <span className="underline">{list?.name}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 justify-start mt-3 items-start flex-col md:flex-row w-full">
              <div className="flex space-x-3 justify-start items-start flex-row w-full">
                <AlignLeft className="text-neutral-700 h-6 w-6" />
                <div className="flex flex-col w-full">
                  <div className="text-neutral-900 mb-2 font-semibold text-base">
                    Description
                  </div>
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="bg-neutral-200 border-0 focus-visible:ring-0 focus-visible:border-0 focus-visible:ring-offset-0 focus-visible:border-transparent text-neutral-900 placeholder-neutral-500"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start max-sm:ml-5 items-start">
                <div className="text-neutral-900 font-semibold text-sm mb-2 max-sm:mt-2 ">
                  Actions
                </div>
                <div className="flex flex-row md:flex-col md:space-y-2 max-sm:space-x-2 justify-center items-center">
                  <Button
                    onClick={handelCopy}
                    type="button"
                    variant="ghost"
                    className="bg-neutral-200 hover:bg-neutral-100 space-x-3"
                  >
                    <Copy className="h-5 w-5 text-neutral-700" />
                    <span className="text-neutral-900">Copy</span>
                  </Button>
                  <Button
                    onClick={handelDelete}
                    type="button"
                    variant="ghost"
                    className="bg-neutral-200 hover:bg-neutral-100 space-x-3"
                  >
                    <Trash className="h-5 w-5 text-neutral-700" />
                    <span className="text-neutral-900">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-3 w-full">
              <Button
                disabled={isLoading}
                variant="primary"
                className="w-full md:w-auto"
                size="lg"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
