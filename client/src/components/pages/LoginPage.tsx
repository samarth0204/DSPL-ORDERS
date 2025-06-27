import logo from "../../static/logo.jpg";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="lg:hidden flex items-center gap-2 font-medium">
            <div className="flex items-center justify-center w-30 h-30">
              <img
                src={logo}
                alt="Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* <span className="text-lg font-semibold hidden sm:inline">
              YourBrand
            </span> */}
          </a>
        </div>

        <div className="flex flex-1 mt-40 lg:mt-0 lg:items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={logo}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
