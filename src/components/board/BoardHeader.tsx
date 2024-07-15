import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField } from "../ui/form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { ElementRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Share2, Trash } from "lucide-react";
import ActionTooltip from "../ActionTooltop";

const formSchema = z.object({
  name: z.string(),
});

const BoardHeader = ({ name }: { name: string }) => {
  const inputRef = useRef<ElementRef<"input">>(null);

  const { boardId } = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const url = qs.stringifyUrl({
    //   url: "/api/workspaces/board",
    //   query: {
    //     boardId: boardId,
    //   },
    // });
    // try {
    //   await axios.patch(url, values);

    //   router.refresh()
    //   inputRef.current?.blur();
    //   toast.success("Board name updated");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Error updating board name");
    // }
  };

  const handleDelete = async () => {
    // const url = qs.stringifyUrl({
    //   url: "/api/workspaces/board",
    //   query: {
    //     boardId: boardId,
    //   },
    // });
    // try {
    //   await axios.delete(url);
    //   toast.success("Successfully deleted board");
    //   router.push("/dashboard");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Error deleting board");
    // }
  };

  return (
    <div className="bg-white/50 h-14 w-full backdrop-blur-sm px-4 py-3">
      <div className="px-3 flex flex-row justify-between items-center">
        <Form {...form}>
          <form
            //   onSubmit={form.handleSubmit(onsubmit)}
            className="flex items-center"
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
                    className="text-neutral-800 focus-visible:ring-offset-1 h-8 focus-visible:ring-indigo-400 py-0 border-0"
                  />
                </FormControl>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-end items-center space-x-4">
          <ActionTooltip content="Share" align="end" side="bottom">
            <Button variant="ghost" size="icon">
              <Share2 className="text-neutral-700 h-6 w-6" />
            </Button>
          </ActionTooltip>
          <ActionTooltip content="Delete" align="end" side="bottom">
            <Button variant="ghost" size="icon">
              <Trash className="text-rose-500 h-6 w-6" />
            </Button>
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
