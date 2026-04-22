import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react"

/** Status variant for Alert coloring */
export type AlertVariant = "success" | "danger" | "warning" | "muted"

export interface AlertProps {
  /** Color variant matching status semantics */
  variant: AlertVariant
  children: React.ReactNode
  className?: string
}

const variantConfig: Record<AlertVariant, { wrapper: string; Icon: React.ElementType }> = {
  success: {
    wrapper: "bg-status-success-subtle border-status-success-border text-status-success",
    Icon: CheckCircle2,
  },
  danger: {
    wrapper: "bg-status-danger-subtle border-status-danger-border text-status-danger",
    Icon: AlertTriangle,
  },
  warning: {
    wrapper: "bg-status-warning-subtle border-status-warning-border text-status-warning",
    Icon: AlertCircle,
  },
  muted: {
    wrapper: "bg-muted border-border text-muted-foreground",
    Icon: Info,
  },
}

export function Alert({ variant, children, className }: AlertProps) {
  const { wrapper, Icon } = variantConfig[variant]
  return (
    <div className={`flex items-start gap-2 p-3 border rounded-lg text-xs ${wrapper} ${className ?? ""}`}>
      <Icon size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}
