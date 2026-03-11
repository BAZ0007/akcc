export function StatusBanner({ status, error }: { status?: string; error?: string }) {
  if (error) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{decodeURIComponent(error)}</div>;
  }

  if (!status) {
    return null;
  }

  const copy =
    status === "saved"
      ? "Changes saved successfully."
      : status === "deleted"
        ? "Record deleted successfully."
        : "Preview mode is active locally because Supabase is not configured yet.";

  return <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{copy}</div>;
}

