import z from "zod";
import axios from "axios";
import qs from "query-string";
import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useParams, useNavigation } from "react-router-dom";
// import useLists from "@/hooks/use-list";
// import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "List name is required",
  }),
});

const NewList = () => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const navigation = useNavigation();
  const { boardId } = useParams();

  // const lists = useLists({ boardId });

  // const { setData } = useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/workspaces/board/list",
        query: {
          boardId: boardId,
        },
      });

      await axios.post(url, values);
      toast.success("List created successfully");
      //   navigation.refresh();

      // setData({ lists });

      form.reset();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create list");
    }

    handleToggle();
  };

  if (isEditing) {
    return (
      <div className="bg-white w-[250px] rounded-lg space-x-2 shadow-sm p-2.5 hover:bg-neutral-100 transition-all flex flex-row justify-start items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      ref={inputRef}
                      className="text-neutral-800 focus-visible:ring-offset-1 h-8 focus-visible:ring-indigo-400 py-0 border-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row mt-2 justify-start items-center space-x-3">
              <Button variant="primary" size="sm">
                Add list
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                variant="ghost"
                size="icon"
              >
                <X className="h-5 w-5 text-neutral-700" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }
  return (
    <button
      onClick={handleToggle}
      className="bg-neutral-50/50 backdrop-blur-sm w-[250px] rounded-lg space-x-2 shadow-sm h-[45px] px-2.5 hover:bg-neutral-100 transition-all flex flex-row justify-start items-center"
    >
      <Plus className="text-neutral-700 h-5 w-5" />
      <div className="font-semibold text-neutral-900 text-sm">Add a list</div>
    </button>
  );
};

export default NewList;
