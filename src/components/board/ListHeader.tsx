"use client"

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

const formSchema = z.object({
  name: z.string(),
});

const ListHeader = ({ name, id }: { name: string; id: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigation();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    console.log(values)
    const url = qs.stringifyUrl({
      url: "/api/workspaces/board/list",
      query: {
        listId: id,
      },
    });
    try {
      await axios.patch(url, values);

    //   router.refresh();
      inputRef.current?.blur();
      toast.success("List name updated");
    } catch (error) {
      console.log(error);
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
                className="text-neutral-800 focus-visible:ring-offset-1 h-8 focus-visible:ring-indigo-400 py-0 border-0"
              />
            </FormControl>
          )}
        />
      </form>
    </Form>
  );
};

export default ListHeader;
