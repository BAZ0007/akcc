import Link from "next/link";

import { deleteCmsRecordAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function formatValue(value: unknown) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

export function ContentTable({
  title,
  section,
  rows,
  columns,
  supportsDelete,
  allowEdit = true,
}: {
  title: string;
  section: string;
  rows: Record<string, unknown>[];
  columns: string[];
  supportsDelete?: boolean;
  allowEdit?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-4">
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-slate-500">{rows.length} record(s)</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column.replace(/_/g, " ")}</TableHead>
              ))}
              {(allowEdit || supportsDelete) ? <TableHead>Actions</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const rowKey = String(row.id ?? row.key ?? row.slug ?? row.title);
              return (
                <TableRow key={rowKey}>
                  {columns.map((column) => (
                    <TableCell key={column}>{formatValue(row[column])}</TableCell>
                  ))}
                  {(allowEdit || supportsDelete) ? (
                    <TableCell className="flex gap-2">
                      {allowEdit ? (
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/${section}?edit=${encodeURIComponent(rowKey)}`}>Edit</Link>
                        </Button>
                      ) : null}
                      {supportsDelete ? (
                        <form action={deleteCmsRecordAction}>
                          <input type="hidden" name="section" value={section} />
                          <input type="hidden" name="id" value={rowKey} />
                          <Button size="sm" variant="ghost" type="submit">
                            Delete
                          </Button>
                        </form>
                      ) : null}
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

