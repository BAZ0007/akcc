import { saveCmsRecordAction } from "@/lib/actions/admin";
import type { AdminSectionConfig } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function getDefaultValue(record: Record<string, unknown> | undefined, name: string) {
  const value = record?.[name];
  if (typeof value === "boolean") {
    return undefined;
  }

  return value ? String(value) : "";
}

export function EntityForm({ section, record }: { section: AdminSectionConfig; record?: Record<string, unknown> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{record ? `Edit ${section.title}` : `Add ${section.title}`}</CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={saveCmsRecordAction} className="grid gap-5 md:grid-cols-2">
          <input type="hidden" name="section" value={section.slug} />
          <input type="hidden" name="id" value={record?.id ? String(record.id) : ""} />
          {section.fields.map((field) => {
            const isChecked = Boolean(record?.[field.name]);
            const commonProps = {
              id: field.name,
              name: field.name,
              required: field.required,
              defaultValue: getDefaultValue(record, field.name),
              placeholder: field.placeholder,
            };

            return (
              <div key={field.name} className={field.type === "textarea" ? "space-y-2 md:col-span-2" : "space-y-2"}>
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea {...commonProps} />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    defaultValue={getDefaultValue(record, field.name)}
                    className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <label className="flex h-11 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-sm text-slate-700">
                    <input type="checkbox" id={field.name} name={field.name} defaultChecked={isChecked} />
                    <span>{field.description ?? field.label}</span>
                  </label>
                ) : (
                  <Input {...commonProps} type={field.type} />
                )}
                {field.description && field.type !== "checkbox" ? <p className="text-xs text-slate-500">{field.description}</p> : null}
              </div>
            );
          })}
          <div className="md:col-span-2">
            <Button type="submit">{record ? "Save Changes" : "Create Record"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

