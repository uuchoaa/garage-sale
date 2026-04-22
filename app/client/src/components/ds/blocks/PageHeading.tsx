import React from "react"

export interface PageHeadingProps {
  /** Main page title */
  title: string
  /** Optional subtitle shown below the title */
  description?: string
  /** Action buttons slot placed to the right of the title */
  actions?: React.ReactNode
}

export function PageHeading({ title, description, actions }: PageHeadingProps) {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 flex md:mt-0 md:ml-4">{actions}</div>
      )}
    </div>
  )
}
