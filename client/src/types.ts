export type FieldType = "text" | "email" | "password" | "number";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
}
