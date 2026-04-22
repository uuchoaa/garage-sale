import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { SecondaryNav } from "./SecondaryNav"
import type { NavTab } from "./SecondaryNav"

const meta: Meta<typeof SecondaryNav> = {
  title: "Blocks/SecondaryNav",
  component: SecondaryNav,
}
export default meta

type Story = StoryObj<typeof SecondaryNav>

function InteractiveTabs({ initialIndex = 0 }: { initialIndex?: number }) {
  const labels = ["Overview", "Invoices", "Customers"]
  const [active, setActive] = useState(initialIndex)

  const tabs: NavTab[] = labels.map((label, i) => ({
    label,
    current: active === i,
    onClick: () => setActive(i),
  }))

  return <SecondaryNav tabs={tabs} />
}

function InteractiveTabsWithAction() {
  const labels = ["Overview", "Invoices", "Customers"]
  const [active, setActive] = useState(0)

  const tabs: NavTab[] = labels.map((label, i) => ({
    label,
    current: active === i,
    onClick: () => setActive(i),
  }))

  return (
    <SecondaryNav
      tabs={tabs}
      trailingAction={
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
        >
          + New invoice
        </button>
      }
    />
  )
}

export const Default: Story = {
  render: () => <InteractiveTabs initialIndex={0} />,
}

export const WithTrailingAction: Story = {
  render: () => <InteractiveTabsWithAction />,
}
