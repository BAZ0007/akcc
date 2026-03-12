import { splitContent } from "@/lib/page-content";
import { cn } from "@/lib/utils";

export function RichText({
  value,
  className,
  paragraphClassName,
}: {
  value?: string | null;
  className?: string;
  paragraphClassName?: string;
}) {
  const paragraphs = splitContent(value);

  if (!paragraphs.length) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 24)}`} className={paragraphClassName}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
