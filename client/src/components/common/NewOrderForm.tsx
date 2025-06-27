// MyFormPage.tsx
import React from "react";
import CommonForm from "./CommonForm";
import type { FieldConfig } from "@/types";

const fields: FieldConfig[] = [
  { name: "username", label: "Username", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "age", label: "Age", type: "number" },
];

const NewOrderForm = () => {
  const handleSubmit = (data: Record<string, any>) => {
    console.log("Form Data:", data);
  };

  return <CommonForm fields={fields} onSubmit={handleSubmit} />;
};

export default NewOrderForm;
