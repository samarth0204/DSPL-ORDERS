import { useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/constants/schema";
import { z } from "zod";
import { useAddUser } from "@/hooks/userHooks";

const roles = [
  { id: "ADMIN", label: "Admin" },
  { id: "FULFILLMENT", label: "Fulfillment" },
  { id: "SALESMAN", label: "Salesman" },
] as const;

type UserForm = z.infer<typeof userSchema>;

const UserFormDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: {
      username: "",
      password: "",
      contactNumber: "",
      roles: [],
    },
    resolver: zodResolver(userSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleClose = (shouldOpen: boolean) => {
    if (!shouldOpen) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmClose) return;
      reset();
    }
    setOpen(shouldOpen);
  };

  const addUserMutation = useAddUser();

  const onSubmit = (data: any) => {
    addUserMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full md:max-w-[700px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <FormInput
              label="Name"
              placeholder="Enter the username"
              {...register("username")}
              error={errors.username?.message}
            />
          </div>
          <div className="mt-2">
            <FormInput
              label="Password"
              placeholder="Enter the password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="mt-2">
            <FormInput
              label="Contact Number"
              placeholder="Enter 10 digit mobile number"
              {...register("contactNumber")}
              error={errors.contactNumber?.message}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]*$/.test(value)) {
                  e.target.value = value;
                } else {
                  e.target.value = value.replace(/[^0-9]/g, "");
                }
              }}
            />
          </div>

          <div className="mt-4">
            <Label className="mb-2 block">Roles</Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <Controller
                  key={role.id}
                  control={control}
                  name="roles"
                  render={({ field }) => {
                    const isChecked = field.value?.includes(role.id);
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={role.id}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, role.id]);
                            } else {
                              field.onChange(
                                field.value.filter((r: string) => r !== role.id)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={role.id}>{role.label}</Label>
                      </div>
                    );
                  }}
                />
              ))}
            </div>
            {errors.roles && (
              <p className="text-sm text-red-500 mt-1">
                {errors.roles.message as string}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full mt-10">
            Save User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
