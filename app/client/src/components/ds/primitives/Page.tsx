import React from "react"

interface Tab {
  label: string
  current: boolean
  onClick?: () => void
}

interface PageHeaderProps {
  title: string
  description?: string
  /** Slot for action buttons placed to the right of the title */
  actions?: React.ReactNode
  /** Underline tab nav rendered below the title */
  tabs?: Tab[]
  /** Secondary content rendered to the right of tabs (e.g. a trailing action button) */
  secondary?: React.ReactNode
}

interface PageProps {
  children: React.ReactNode
  variant?: "default" | "full-bleed"
}

function PageHeader({ title, description, actions, tabs, secondary }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
      {tabs && tabs.length > 0 && (
        <div className="mt-4 flex items-center justify-between border-b border-border">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={tab.onClick}
                aria-current={tab.current ? "page" : undefined}
                className={
                  tab.current
                    ? "border-primary text-primary border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap"
                }
              >
                {tab.label}
              </button>
            ))}
          </nav>
          {secondary && <div className="mb-1">{secondary}</div>}
        </div>
      )}
    </div>
  )
}

export function Page({ children, variant = "default" }: PageProps) {
  if (variant === "full-bleed") {
    return <div className="-m-6 md:-m-10">{children}</div>
  }
  return <div>{children}</div>
}

Page.Header = PageHeader
