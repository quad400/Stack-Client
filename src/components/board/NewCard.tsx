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
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useNavigation } from "react-router-dom";
import { Textarea } from "../ui/textarea";

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
  const navigattion = useNavigation();
  const [isEditing, setIsEditing] = useState(false);

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
      const url = qs.stringifyUrl({
        url: "/api/workspaces/board/card",
        query: {
          listId: listId,
        },
      });

      await axios.post(url, values);
      toast.success("Card created successfully");
      //   router.refresh();
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
