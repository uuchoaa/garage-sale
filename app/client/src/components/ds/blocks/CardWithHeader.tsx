import React from "react"

export interface CardWithHeaderProps {
  /** Content for the header band */
  header: React.ReactNode
  /** Card body content */
  children: React.ReactNode
  className?: string
}

export function CardWithHeader({ header, children, className }: CardWithHeaderProps) {
  return (
    <div
      className={`divide-y divide-border overflow-hidden rounded-lg bg-card shadow-sm dark:shadow-none dark:inset-ring dark:inset-ring-border${className ? ` ${className}` : ""}`}
    >
      <div className="px-4 py-5 sm:px-6">{header}</div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
