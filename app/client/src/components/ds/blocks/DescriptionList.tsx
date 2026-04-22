import React from "react"

export interface DescriptionItem {
  label: string
  value: React.ReactNode
}

export interface DescriptionListProps {
  /** Optional section title */
  title?: string
  /** Optional subtitle below the title */
  description?: string
  items: DescriptionItem[]
}

export function DescriptionList({ title, description, items }: DescriptionListProps) {
  return (
    <div>
      {(title || description) && (
        <div className="px-4 sm:px-0">
          {title && (
            <h3 className="text-base/7 font-semibold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="mt-1 max-w-2xl text-sm/6 text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="mt-6 border-t border-border">
        <dl className="divide-y divide-border">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-sm/6 font-medium text-foreground">{item.label}</dt>
              <dd className="mt-1 text-sm/6 text-muted-foreground sm:col-span-2 sm:mt-0">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
