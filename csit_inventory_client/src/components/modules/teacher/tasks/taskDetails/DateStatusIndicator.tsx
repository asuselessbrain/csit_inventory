import { formatDate } from "@/components/shared/ReusableFunction";

export default function DateStatusIndicator({
  label,
  date,
  Icon,
  divClassName,
  iconClassName,
  dateClassName,
}: {
  label: string;
  date: string;
  Icon: React.ComponentType<{ className?: string }>;
  divClassName?: string;
  iconClassName?: string;
  dateClassName?: string;
}) {
  const isDueDate = label === "Due Date";
  const isOverdue = new Date(date) < new Date();

  return (
    <div className="flex items-start gap-3">
      <div
        className={`rounded-full p-2 ${
          isDueDate
            ? isOverdue
              ? "bg-red-100 dark:bg-red-900/30"
              : "bg-green-100 dark:bg-green-900/30"
            : divClassName
        }`}
      >
        <Icon
          className={`h-4 w-4 ${
            isDueDate
              ? isOverdue
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
              : iconClassName
          }`}
        />
      </div>
      <div>
        <p className="font-medium text-sm">{label}</p>
        <p
          className={`text-sm ${
            isDueDate
              ? isOverdue
                ? "text-red-600 dark:text-red-400 font-medium"
                : "text-muted-foreground"
              : dateClassName
          }`}
        >
          {formatDate(date)}
          {isDueDate && isOverdue && " (Overdue)"}
        </p>
      </div>
    </div>
  );
}
