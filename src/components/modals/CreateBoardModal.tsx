import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { CloseModal } from "@/features/workspaceSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { boardFormSchema } from "@/lib/schema/workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import ImageSelector from "../ImageSelector";

const CreateBoardModal = () => {
  const { modalType, showModal } = useAppSelector((state) => state.workspace);

  const isOpen = modalType === "createBoard" && showModal;

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof boardFormSchema>) => {
    //       try{
    //         const {data} = await axios.post("/api/workspaces", values)
    //         onClose()
    //         form.reset()
    //         toast.success("Workspace created successfully")
    //         router.push(`/dashboard/${data?._id}`)
    //       }catch(error){
    //         toast.error("Error creating workspace")
    //       }
  };

  const onClose = () => {
    dispatch(CloseModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full p-0 border-0">
        <DialogTitle className="text-center text-xl mt-5 font-semibold text-neutral-800">
          Create Board
        </DialogTitle>
        <DialogDescription className="text-center -mt-3 text-neutral-500 text-sm font-normal">
          Create a new board for workspace
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-4">
            <div className="mx-6 flex flex-col space-y-3">
              <FormField
                control={form.control}
                name="imageUrl"
                render={() => (
                  <FormItem>
                    <ImageSelector
                      onSelect={form.setValue.bind(null, "imageUrl")}
                      selected={form.getValues("imageUrl")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-800 font-medium">
                      Name
                      <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={isLoading}
                        className="w-full text-neutral-800 focus-visible:ring-offset-1 focus-visible:ring-indigo-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-neutral-100 px-4 py-2 mt-3 w-full">
              <Button
                disabled={isLoading}
                variant="primary"
                className="w-full md:w-auto"
                size="lg"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardModal;
