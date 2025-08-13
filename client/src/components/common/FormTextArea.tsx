import { forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormTextAreaProps = {
  label: string;
  placeholder?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, placeholder, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <Label className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
        <Textarea
          ref={ref}
          className="min-h-[80px] px-3 text-sm"
          placeholder={placeholder}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
