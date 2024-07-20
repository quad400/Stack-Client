"use client";

import z from "zod";
import axios from "axios";
import qs from "query-string";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { useParams, useNavigation } from "react-router-dom";
import { toast } from "sonner";
import BASE_URL from "@/constants/Endpoint";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { GetBoardDispatch } from "@/features/workspaceSlice";

const formSchema = z.object({
  name: z.string(),
});

const ListHeader = ({ name, _id }: { name: string; _id: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { token } = useAppSelector((state) => state.user);
  const { board } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });


  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!board) return;

    const workspaceId  = board.workspaceId.toString()

    const url = qs.stringifyUrl({
      url: `${BASE_URL}/lists/${_id}`,
      query: {
        workspaceId: workspaceId
      },
    });
    try {
      await axios.patch(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //   router.refresh();
      inputRef.current?.blur();
      dispatch(GetBoardDispatch(board._id));
      toast.success("List name updated");
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error("Error updating list name");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormControl>
              <Input
                disabled={loading}
                {...field}
                autoComplete="off"
                ref={inputRef}
                id="name"
                defaultValue={name}
                className="text-neutral-800 cursor-pointer bg-transparent focus:bg-white focus-visible:ring-offset-1 h-8 focus-visible:ring-indigo-400 py-0 border-0"
              />
            </FormControl>
          )}
        />
      </form>
    </Form>
  );
};

export default ListHeader;
