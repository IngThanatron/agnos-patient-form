"use client";

import clsx from "clsx";
import type { PatientStatus } from "@/types/patient";

interface StatusIndicatorProps {
  status: PatientStatus;
  showLabel?: boolean;
  size?: "sm" | "md";
}

const statusConfig: Record<
  PatientStatus,
  { label: string; dotClass: string; badgeClass: string }
> = {
  idle: {
    label: "Idle",
    dotClass: "bg-clinical-muted",
    badgeClass: "bg-slate-100 text-clinical-muted",
  },
  typing: {
    label: "Typing...",
    dotClass: "bg-clinical-blue animate-[pulse-dot_1.4s_ease-in-out_infinite]",
    badgeClass: "bg-blue-50 text-clinical-blue",
  },
  submitted: {
    label: "Submitted",
    dotClass: "bg-clinical-green",
    badgeClass: "bg-emerald-50 text-clinical-green",
  },
};

export function StatusIndicator({
  status,
  showLabel = true,
  size = "md",
}: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <span
      className={clsx(
        "status-badge",
        config.badgeClass,
        size === "sm" && "text-[10px] px-2 py-0.5"
      )}
    >
      <span
        className={clsx(
          "rounded-full flex-shrink-0",
          config.dotClass,
          size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"
        )}
      />
      {showLabel && config.label}
    </span>
  );
}
