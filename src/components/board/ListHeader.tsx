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
  const { workspace, board } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  console.log(name)

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!workspace || !board) return;

    const url = qs.stringifyUrl({
      url: `${BASE_URL}/lists`,
      query: {
        workspaceId: workspace?._id,
        listId: _id,
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
                ref={inputRef}
                id="name"
                defaultValue={name}
                className="text-neutral-800 bg-transparent focus:bg-white focus-visible:ring-offset-1 h-8 focus-visible:ring-indigo-400 py-0 border-0"
              />
            </FormControl>
          )}
        />
      </form>
    </Form>
  );
};

export default ListHeader;
