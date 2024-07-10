import { CircleCheck, Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerFormSchema } from "@/lib/schema/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    navigate("/verify")
  };

  return (
    <div className="w-full flex md:flex-row h-screen md:px-10 px-6 bg-neutral-100 justify-center items-center">
      <div className="w-full hidden md:flex flex-col gap-4">
        <div className="text-neutral-900 font-bold text-2xl">Stack</div>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-2 justify-start items-start">
            <CircleCheck className="text-indigo-600 h-6 w-6" />
            <div className="flex flex-col justify-start items-start flex-wrap w-3/4">
              <div className="text-neutral-800 text-sm font-semibold">
                Get started quickly
              </div>

              <div className="text-neutral-800 text-[14px] font-medium">
                Manage all your projects within your workspace.
              </div>
            </div>
          </li>
          <li className="flex gap-2 justify-start items-start">
            <CircleCheck className="text-indigo-600 h-6 w-6" />
            <div className="flex flex-col justify-start items-start flex-wrap w-3/4">
              <div className="text-neutral-800 text-[14px] font-semibold">
                Support any business model
              </div>

              <div className="text-neutral-800 text-sm font-medium">
                ME-commerce, subscriptions, SaaS platforms, marketplaces, and
                more—all within a unified platform.
              </div>
            </div>
          </li>
          <li className="flex gap-2 justify-start items-start">
            <CircleCheck className="text-indigo-600 h-6 w-6" />
            <div className="flex flex-col justify-start items-start flex-wrap w-3/4">
              <div className="text-neutral-800 text-[14px] font-semibold">
                Join millions of businesses
              </div>

              <div className="text-neutral-800 text-sm font-medium">
                Stripe is trusted by ambitious startups and enterprises of every
                size.
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="bg-white w-full shadow-lg rounded-lg pt-6  justify-center items-start flex-col flex lg:w-3/4">
        <div className="w-full justify-center items-center mb-4">
          <div className="text-xl text-center text-neutral-900 font-bold">
            Create your Stack account
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-800 font-medium">
                      FullName
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
                    <FormLabel className="text-sm text-neutral-800 font-medium">
                      Password
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
                  Get emails from Stack about product updates, industry news,
                  and events.You can{" "}
                  <span className="text-indigo-600 cursor-pointer font-semibold">
                    unsubscribe
                  </span>{" "}
                  at anytime.{" "}
                  <span className="text-indigo-600 cursor-pointer font-semibold">
                    Privacy Policy
                  </span>
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
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 cursor-pointer text-sm">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
