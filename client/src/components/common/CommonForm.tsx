import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny, ZodObject } from "zod";
import type { FieldConfig } from "@/types";

interface CommonFormProps {
  fields: FieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
}

const generateZodSchema = (fields: FieldConfig[]): ZodObject<any> => {
  const shape: Record<string, ZodTypeAny> = {};

  fields.forEach((field) => {
    let schema = z.string({ required_error: `${field.label} is required` });

    if (field.type === "email") {
      schema = schema.email("Invalid email address");
    }

    shape[field.name] = field.required ? schema : schema.optional();
  });

  return z.object(shape);
};

const CommonForm: React.FC<CommonFormProps> = ({ fields, onSubmit }) => {
  const schema = generateZodSchema(fields);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="font-medium mb-1">
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            {...register(field.name)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors[field.name] && (
            <span className="text-red-500 text-sm mt-1">
              {(errors[field.name]?.message as string) || "Field is invalid"}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
      >
        Submit
      </button>
    </form>
  );
};

export default CommonForm;
