import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormInput from "./common/FormInput";
import { loginSchema } from "@/constants/schema";
import Loader from "./common/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/userHooks";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
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

  const login = useLogin();
  const navigate = useNavigate();
  const setRoles = useUserStore((store) => store.setRoles);

  const onSubmit = (data: any) => {
    login.mutate(data, {
      onSuccess: (userData) => {
        localStorage.setItem("id", userData.user.id);
        setRoles(userData.user.roles);
        localStorage.setItem("username", userData.user.username);
        const roles = userData.user.roles;
        if (roles.includes("ADMIN")) {
          navigate("/in-progress"); // or a dashboard route
        } else if (roles.includes("SALESMAN")) {
          navigate("/in-progress");
        } else if (roles.includes("FULFILLMENT")) {
          navigate("/all-orders");
        } else {
          navigate("/login"); // fallback
        }
      },
    });
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
          Enter your credentials below
        </p>
      </div>

      <div className="grid gap-6">
        <FormInput
          label="Username"
          placeholder="Enter your username"
          {...register("username")}
          error={errors.username?.message}
        />

        <FormInput
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password?.message}
        />

        {login.isPending ? (
          <Loader />
        ) : (
          <Button type="submit" className="w-full">
            Login
          </Button>
        )}

        {login.isError && (
          <p className="font-extralight text-red-500 text-sm">
            Login failed! Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
