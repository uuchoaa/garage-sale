import React from "react"
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react"
import type { StatusVariant } from "./StatusBadge"

interface AlertBannerProps {
  variant: StatusVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<StatusVariant, { wrapper: string; icon: string; Icon: React.ElementType }> = {
  success: {
    wrapper: "bg-status-success-subtle border-status-success-border text-status-success",
    icon:    "text-status-success",
    Icon:    CheckCircle2,
  },
  danger: {
    wrapper: "bg-status-danger-subtle border-status-danger-border text-status-danger",
    icon:    "text-status-danger",
    Icon:    AlertTriangle,
  },
  warning: {
    wrapper: "bg-status-warning-subtle border-status-warning-border text-status-warning",
    icon:    "text-status-warning",
    Icon:    AlertCircle,
  },
  muted: {
    wrapper: "bg-muted border-border text-muted-foreground",
    icon:    "text-muted-foreground",
    Icon:    Info,
  },
}

export function AlertBanner({ variant, children, className }: AlertBannerProps) {
  const { wrapper, icon, Icon } = variantStyles[variant]
  return (
    <div className={`flex items-start gap-2 p-3 border rounded-lg text-xs ${wrapper} ${className ?? ""}`}>
      <Icon size={14} className={`${icon} flex-shrink-0 mt-0.5`} />
      <span>{children}</span>
    </div>
  )
}
