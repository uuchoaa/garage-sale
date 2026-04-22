import React from "react"
import { ChevronDown } from "lucide-react"

export interface NavTab {
  /** Tab label */
  label: string
  /** Whether this tab is currently active */
  current: boolean
  /** Click handler for navigation */
  onClick?: () => void
}

export interface SecondaryNavProps {
  tabs: NavTab[]
  /** Optional element rendered to the right of the tabs (e.g. "+ New invoice" button) */
  trailingAction?: React.ReactNode
}

export function SecondaryNav({ tabs, trailingAction }: SecondaryNavProps) {
  const currentTab = tabs.find((tab) => tab.current)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = tabs.find((tab) => tab.label === e.target.value)
    selected?.onClick?.()
  }

  const navContent = (
    <div className="border-b border-border">
      <nav aria-label="Tabs" className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={tab.onClick}
            aria-current={tab.current ? "page" : undefined}
            className={[
              tab.current
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              "border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )

  return (
    <div>
      {/* Mobile: select dropdown */}
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={currentTab?.label ?? ""}
          onChange={handleSelectChange}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-card py-2 pr-8 pl-3 text-base text-foreground outline-1 -outline-offset-1 outline-border focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
        >
          {tabs.map((tab) => (
            <option key={tab.label} value={tab.label}>
              {tab.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-muted-foreground"
        />
      </div>

      {/* Desktop: tab bar */}
      <div className="hidden sm:block">
        {trailingAction ? (
          <div className="flex items-center justify-between">
            {navContent}
            <div>{trailingAction}</div>
          </div>
        ) : (
          navContent
        )}
      </div>
    </div>
  )
}
