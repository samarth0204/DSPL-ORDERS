import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormInput from "./common/FormInput";
import { loginSchema } from "@/constants/schema";
import { useState } from "react";
import Loader from "./common/Loader";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log(data);
      setLoading(false);
      reset();
    }, 2000);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <FormInput
            label="Username"
            placeholder="Enter your username"
            {...register("username")}
            error={errors.username?.message}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <FormInput
              label="Password"
              {...register("password")}
              type="password"
              error={errors.password?.message}
              autoComplete=""
            />
          </div>
        </div>
        {loading ? (
          <Loader className="bg-white" message="Logging in..." />
        ) : (
          <Button type="submit" className="w-full">
            Login
          </Button>
        )}
      </div>
    </form>
  );
}
