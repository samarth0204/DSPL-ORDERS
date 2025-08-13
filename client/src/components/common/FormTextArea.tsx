import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormTextAreaProps = {
  label: string;
  placeholder?: string;
};

const FormTextArea = ({ label, placeholder }: FormTextAreaProps) => {
  return (
    <div className="w-full space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Textarea className="h-9 px-3 text-sm" placeholder={placeholder} />
    </div>
  );
};

export default FormTextArea;
