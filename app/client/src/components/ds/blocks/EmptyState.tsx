import { Plus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface EmptyStateAction {
  label: string
  onClick: () => void
}

export interface EmptyStateProps {
  /** Lucide icon component (e.g. `Folder`, `FileText`) */
  icon?: LucideIcon
  title: string
  description?: string
  action?: EmptyStateAction
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center">
      {Icon && (
        <Icon aria-hidden="true" className="mx-auto size-12 text-muted-foreground" />
      )}
      <h3 className="mt-2 text-sm font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Plus aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
            {action.label}
          </button>
        </div>
      )}
    </div>
  )
}
