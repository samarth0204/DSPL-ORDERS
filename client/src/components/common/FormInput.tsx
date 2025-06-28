// src/components/FormInput.tsx
import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

// forwardRef allows this component to be registered via react-hook-form
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, placeholder, error, type = "text", ...rest }, ref) => {
    return (
      <div className="space-y-1 w-full">
        <label className="text-sm font-medium">{label}</label>
        <Input ref={ref} placeholder={placeholder} type={type} {...rest} />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput"; // required for forwardRef

export default FormInput;
