import React from "react"

export type StatusPillVariant = "success" | "danger" | "warning" | "neutral"

export interface StatusPillProps {
  /** Visual variant controlling colors */
  variant: StatusPillVariant
  children: React.ReactNode
}

const variantClasses: Record<StatusPillVariant, string> = {
  success: "bg-status-success-subtle text-status-success inset-ring inset-ring-status-success-border/20",
  danger:  "bg-status-danger-subtle text-status-danger inset-ring inset-ring-status-danger-border/10",
  warning: "bg-status-warning-subtle text-status-warning inset-ring inset-ring-status-warning-border/20",
  neutral: "bg-muted text-muted-foreground inset-ring inset-ring-border/50",
}

export function StatusPill({ variant, children }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
