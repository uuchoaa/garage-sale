import { AlertCircle, AlertTriangle, CheckCircle2, Clock, Link2, MessageCircle } from "lucide-react"

export type StatusVariant = "success" | "danger" | "warning" | "muted"

interface StatusBadgeConfig {
  label: string
  variant: StatusVariant
  Icon: React.ElementType
}

export const statusRegistry: Record<string, StatusBadgeConfig> = {
  connected:      { label: "Conectado",       variant: "success",  Icon: CheckCircle2 },
  needs_auth:     { label: "Reautenticar",     variant: "danger",   Icon: AlertTriangle },
  suspended:      { label: "Suspenso",         variant: "danger",   Icon: AlertCircle },
  quota_exceeded: { label: "Cota excedida",    variant: "danger",   Icon: AlertCircle },
  not_connected:  { label: "Não conectado",    variant: "muted",    Icon: Link2 },
  unanswered:     { label: "Sem resposta",     variant: "danger",   Icon: AlertCircle },
  active:         { label: "Ativo",            variant: "success",  Icon: MessageCircle },
  pickup_pending: { label: "Retirada pendente",variant: "muted",    Icon: Clock },
}

const variantClasses: Record<StatusVariant, string> = {
  success: "text-status-success",
  danger:  "text-status-danger",
  warning: "text-status-warning",
  muted:   "text-muted-foreground",
}

interface StatusBadgeProps {
  status: keyof typeof statusRegistry
  size?: number
}

export function StatusBadge({ status, size = 16 }: StatusBadgeProps) {
  const config = statusRegistry[status]
  if (!config) return null
  const { label, variant, Icon } = config
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${variantClasses[variant]}`}>
      <Icon size={size} />
      {label}
    </span>
  )
}
