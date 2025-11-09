"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { dailyFormFields, type Field } from "@/constants/formFields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Sun, Moon, ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useAddReport } from "@/hooks/reportHooks";

type DailyReportFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type DailyReportFormData = Record<string, string | number | Date | null>;

export const DailyReportForm: React.FC<DailyReportFormProps> = ({
  open,
  setOpen,
}) => {
  const [reportType, setReportType] = useState<"MORNING" | "EVENING">(
    "MORNING"
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DailyReportFormData>({
    defaultValues: {
      date: new Date(),
    },
  });

  const useAddReportMutation = useAddReport();

  const fields = dailyFormFields[reportType];

  const getDayOfWeek = (date?: Date) =>
    date ? date.toLocaleDateString("en-US", { weekday: "long" }) : "";

  const onSubmit = (data: DailyReportFormData) => {
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
      ...data,
      userId,
      reportType,
      date: utcDate.toISOString(), // ✅ send explicit UTC midnight string
    };
    console.log("Submitted data:", payload);

    useAddReportMutation.mutate(payload, {
      onSuccess: () => {
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
            <div className="flex items-center gap-2 mb-4">
              <AnimatePresence mode="wait" initial={false}>
                {reportType === "MORNING" ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="inline mb-1 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="inline mb-1 text-blue-400" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.span
                key={reportType}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold"
              >
                {reportType === "MORNING" ? "Morning Report" : "Evening Report"}
              </motion.span>
            </div>

            <div className="inline-block rounded-md bg-gray-200">
              <ToggleGroup
                variant="outline"
                type="single"
                value={reportType}
                onValueChange={(value) =>
                  value &&
                  setReportType(value.toUpperCase() as "MORNING" | "EVENING")
                }
              >
                <ToggleGroupItem
                  value="MORNING"
                  className="data-[state=on]:bg-yellow-500 data-[state=on]:text-white"
                >
                  Morning
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="EVENING"
                  className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                >
                  Evening
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
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

          {/* Dynamic Form Fields */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {fields.map((field: Field) => (
              <div key={field.name} className="flex flex-col space-y-1">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    {...register(field.name, { required: field.required })}
                    disabled={field.disabled}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    {...register(field.name, { required: field.required })}
                    disabled={field.disabled}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-xs text-red-500">
                    {field.label} is required
                  </p>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Submit {reportType === "MORNING" ? "Morning" : "Evening"} Report
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
