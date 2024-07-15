import { useState, useEffect } from "react";
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
import { IWorkspace } from "@/lib/interfaces";
import axios from "axios";
import BASE_URL from "@/constants/Endpoint";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { z } from "zod";
import { GetWorkspacesDispatch, WorkspaceDispatch } from "@/features/workspaceSlice";

const EditForm = ({
  setIsEdit,
  workspace,
}: {
  setIsEdit: any;
  workspace: IWorkspace;
}) => {
  const [preview, setPreview] = useState(workspace.image);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(workspace.image);

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()

  const form = useForm({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const isLoading = form.formState.isSubmitting || uploading;

  useEffect(() => {
    if (workspace) {
      form.setValue("name", workspace.name);
      form.setValue("description", workspace.description);
    }
  }, [form, workspace]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files, displayUrl } = getImageData(event);
    setPreview(displayUrl);
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", files[0]);

      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedImageUrl(response.data.data); // Adjust this based on your API response
      } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof workspaceFormSchema>) => {

    try {
      const workspaceData = {
        ...values,
        image: uploadedImageUrl,
      };

      const {data} = await axios.patch(`${BASE_URL}/workspaces/${workspace._id}`, workspaceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEdit(false)
      dispatch(WorkspaceDispatch(data.data))
      dispatch(GetWorkspacesDispatch())
      toast.success("Workspace updated successfully");

    } catch (error) {
      console.error("Error creating workspace:", error);
      toast.error("Error updating workspace");
    }
  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
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
                      {...field}
                      disabled={isLoading}
                      onChange={(event) => {
                        field.onChange(event); // Update form value
                        handleFileChange(event); // Upload file
                      }}
                    />
                    {uploading && (
                      <Loader2 className="text-neutral-600 h-4 w-4 animate-spin" />
                    )}
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
                  defaultValue={workspace.name}
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
