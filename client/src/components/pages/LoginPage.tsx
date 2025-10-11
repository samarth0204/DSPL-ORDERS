import logo from "../../assets/logo.png";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 h-[70vh] md:h-[80vh] items-center justify-center">
      <img
        src={logo}
        alt="Logo"
        className="max-w-full max-h-full object-contain w-20 lg:w-50 md:w-30"
      />
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
}
