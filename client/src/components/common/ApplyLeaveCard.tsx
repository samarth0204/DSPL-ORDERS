import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ChevronDownIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useApplyLeave } from "@/hooks/reportHooks";

type LeaveFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type LeaveFormData = Record<string, string | number | Date | null>;

const ApplyLeaveCard: React.FC<LeaveFormProps> = ({ open, setOpen }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormData>({
    defaultValues: {
      date: new Date(),
    },
  });

  const useApplyLeaveMutation = useApplyLeave();

  const getDayOfWeek = (date?: Date) =>
    date ? date.toLocaleDateString("en-US", { weekday: "long" }) : "";

  const onSubmit = (data: LeaveFormData) => {
    const userId = localStorage.getItem("id") || "";
    if (!data.date) {
      console.error("No date selected!");
      return;
    }

    //Normalize to true UTC midnight (not local)
    const selectedDate = new Date(data.date);
    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );

    const payload = {
      userId,
      date: utcDate.toISOString(), // ✅ send explicit UTC midnight string
    };

    console.log("🚀 Final payload sent to backend:", payload);
    useApplyLeaveMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            <p>Apply Leave</p>
          </DialogTitle>
        </DialogHeader>

        {/* Date Selector (Now part of the form via Controller) */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex sm:w-full md:w-fit sm:justify-between text-sm gap-4 p-4 items-center bg-gray-50 rounded-md border-2">
            <Controller
              control={control}
              name="date"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value as Date}
                        onSelect={(selectedDate) => {
                          field.onChange(selectedDate);
                          setOpenCalendar(false);
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-xs text-red-500">
                      {errors.date.message?.toString()}
                    </p>
                  )}
                </div>
              )}
            />
            <div>
              <span className="font-semibold">Day:</span>{" "}
              {getDayOfWeek(control._formValues.date)}
            </div>
          </div>

          <div className="m-2 border-t border-gray-400" />
          <Button type="submit" className="w-full mt-4">
            Apply Leave
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyLeaveCard;
