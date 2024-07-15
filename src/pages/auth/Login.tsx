import { Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginFormSchema } from "@/lib/schema/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import BASE_URL from "@/constants/Endpoint";
import { useAppSelector } from "@/hooks/useRedux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/login`, values);

      toast.success("Login Successful");

      localStorage.setItem("token", data?.data.tokens.access);
      navigate(`/workspace`, { replace: true });
      form.reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(`/workspace`);
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col px-6 md:px-10 bg-neutral-100">
      <div className="text-neutral-900 font-bold text-3xl text-left mb-4">
        Stack
      </div>
      <div className="bg-white w-full shadow-lg rounded-lg pt-6  justify-center items-start flex-col flex md:w-1/2 lg:w-1/3">
        <div className="w-full justify-center items-center mb-4">
          <div className="text-xl text-center text-neutral-900 font-bold">
            Sign in to your account
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 px-8"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-800 font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm flex justify-between items-center text-neutral-800 font-medium">
                      Password
                      <span className="text-indigo-600 font-semibold text-sm">
                        Forgot your password?
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isLoading}
                          type={showPassword ? "text" : "password"}
                          className={cn(
                            "w-full text-neutral-800 text-sm focus-visible:ring-offset-1 focus-visible:ring-indigo-400",
                            !showPassword && "text-lg font-bold"
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={toggleShowPassword}
                        >
                          {field.value.length > 0 &&
                            (showPassword ? (
                              <EyeOff className="text-neutral-800 h-4 w-4" />
                            ) : (
                              <Eye className="text-neutral-800 h-4 w-4" />
                            ))}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 justify-start items-start cursor-pointer mt-4">
                <Input type="checkbox" className="h-5 w-5 rounded-sm" />
                <div className="text-neutral-800 text-sm">
                  Stay signed in for a week
                </div>
              </div>
            </div>
            <Button variant="primary" className="w-full" disabled={isLoading}>
              Create account
            </Button>
          </form>
        </Form>
        <div className="mt-6 w-full">
          <div className="m-1">
            <div className="text-sm text-neutral-800 py-4 font-medium rounded-md text-center bg-neutral-200 ">
              New to Stack?{" "}
              <Link
                to="/register"
                className="text-indigo-600 cursor-pointer text-sm"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
