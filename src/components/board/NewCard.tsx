import z from "zod";
import axios from "axios";
import qs from "query-string";
import { X } from "lucide-react";
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
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import BASE_URL from "@/constants/Endpoint";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { GetListCardDispatch } from "@/features/workspaceSlice";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Card name is required",
  }),
});

interface NewCardProps {
  listId: string;
  children: React.ReactNode;
}

const NewCard = ({ listId, children }: NewCardProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const { workspace, board } = useAppSelector((state) => state.workspace);
  const { token } = useAppSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!board) return;

      const url = qs.stringifyUrl({
        url: `${BASE_URL}/cards`,
        query: {
          workspaceId: board?.workspaceId.toString(),
          listId: listId,
        },
      });

      await axios.post(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Card created successfully");

      dispatch(GetListCardDispatch(board?._id));

      form.reset();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create card");
    }

    handleToggle();
  };

  if (isEditing) {
    return (
      <div className="w-full rounded-lg space-x-2 shadow-sm p-2.5 transition-all flex flex-row justify-start items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isLoading}
                      ref={inputRef}
                      placeholder="Write your details..."
                      className="text-neutral-800 ring-1 py-2 text-sm font-normal ring-neutral-300 focus-visible:ring-offset-1 h-8 focus-visible:ring-indigo-400 border-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row mt-2 justify-start items-center space-x-3">
              <Button variant="primary" size="sm">
                Add Card
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
    <div onClick={handleToggle} className="flex w-full">
      {children}
    </div>
  );
};

export default NewCard;
