import type { Meta, StoryObj } from "@storybook/react-vite"
import { PlusIcon } from "lucide-react"
import { CardWithHeader } from "./CardWithHeader"
import { StatusPill } from "./StatusPill"

const meta: Meta<typeof CardWithHeader> = {
  title: "Blocks/CardWithHeader",
  component: CardWithHeader,
}
export default meta

type Story = StoryObj<typeof CardWithHeader>

export const Default: Story = {
  render: () => (
    <CardWithHeader header={<span className="text-sm font-semibold text-foreground">Card Header</span>}>
      <p className="text-sm text-muted-foreground">
        This is the card body. Place any content here.
      </p>
    </CardWithHeader>
  ),
}

export const WithRichHeader: Story = {
  render: () => (
    <CardWithHeader
      header={
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">Active Listings</span>
            <StatusPill variant="success">Live</StatusPill>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-card px-3 py-1.5 text-xs font-medium text-foreground inset-ring inset-ring-border hover:bg-muted"
          >
            <PlusIcon className="size-3.5" aria-hidden="true" />
            Add item
          </button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground">
        Your active listings will appear here once you add items.
      </p>
    </CardWithHeader>
  ),
}
