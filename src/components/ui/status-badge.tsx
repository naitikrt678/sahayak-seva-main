import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: 'completed' | 'pending' | 'in-process';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    completed: {
      icon: CheckCircle,
      color: "text-status-success",
      bg: "bg-status-success/10"
    },
    pending: {
      icon: XCircle,
      color: "text-status-error",
      bg: "bg-status-error/10"
    },
    'in-process': {
      icon: Clock,
      color: "text-status-pending",
      bg: "bg-status-pending/10"
    }
  };

  const variant = variants[status];
  const Icon = variant.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
      variant.bg,
      variant.color,
      className
    )}>
      <Icon className="h-3 w-3" />
      <span className="capitalize">
        {status === 'in-process' ? 'In Process' : status}
      </span>
    </div>
  );
}