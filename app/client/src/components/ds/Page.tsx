import React from "react"

interface PageProps {
  children: React.ReactNode
  variant?: "default" | "full-bleed"
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
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
