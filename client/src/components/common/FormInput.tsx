import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, placeholder, error, type = "text", ...rest }, ref) => {
    return (
      <div className="w-full space-y-1">
        <Label className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
        <Input
          ref={ref}
          placeholder={placeholder}
          type={type}
          className="h-9 px-3 text-sm"
          {...rest}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
