import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workspaceFormSchema } from "@/lib/schema/workspace";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { getImageData } from "@/lib/utils";
import { Button } from "../ui/button";



const EditForm = ({ setIsEdit }: { setIsEdit: any }) => {
  const [preview, setPreview] = useState("");

  const form = useForm({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      imageurl: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-3">
        <FormField
          control={form.control}
          name="imageurl"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel>
                  Image <span className="text-rose-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex space-x-4">
                    {preview && (
                      <img src={preview} className="h-10 w-10 rounded-md" />
                    )}
                    <Input
                      type="file"
                      {...rest}
                      onChange={(event) => {
                        const { files, displayUrl } = getImageData(event);
                        setPreview(displayUrl);
                        onChange(files);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
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
                  // disabled={isLoading}
                  className="w-full
               text-neutral-800 focus-visible:ring-offset-1 focus-visible:ring-indigo-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-neutral-800 font-medium">
                Description
                <span className="text-neutral-600 font-light text-xs">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  // disabled={isLoading}
                  className="w-full
               text-neutral-800 focus-visible:ring-offset-1 focus-visible:ring-indigo-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-start space-x-4 items-center mt-4">
          <Button variant="primary" size="sm">
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
