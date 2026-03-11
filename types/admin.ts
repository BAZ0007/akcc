export type AdminFieldType = "text" | "textarea" | "date" | "url" | "number" | "checkbox" | "select" | "email";

export interface AdminFieldOption {
  label: string;
  value: string;
}

export interface AdminFieldConfig {
  name: string;
  label: string;
  type: AdminFieldType;
  placeholder?: string;
  required?: boolean;
  description?: string;
  options?: AdminFieldOption[];
}

export interface AdminSectionConfig {
  slug: string;
  title: string;
  description: string;
  table: string;
  orderColumn: string;
  ascending?: boolean;
  fields: AdminFieldConfig[];
  readOnly?: boolean;
  supportsDelete?: boolean;
  listColumns: string[];
}

