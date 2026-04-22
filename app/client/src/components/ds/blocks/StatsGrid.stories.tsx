import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatsGrid } from "./StatsGrid"

const meta: Meta<typeof StatsGrid> = {
  title: "Blocks/StatsGrid",
  component: StatsGrid,
}
export default meta

type Story = StoryObj<typeof StatsGrid>

export const GapVariant: Story = {
  args: {
    variant: "gap",
    stats: [
      { name: "Revenue", value: "$405,091.00", change: "+4.75%", changeType: "positive" },
      { name: "Overdue invoices", value: "$12,787.00", change: "+54.02%", changeType: "negative" },
      { name: "Outstanding invoices", value: "$245,988.00", change: "-1.39%", changeType: "positive" },
      { name: "Expenses", value: "$30,156.00", change: "+10.18%", changeType: "negative" },
    ],
  },
}

export const CardVariant: Story = {
  args: {
    variant: "card",
    stats: [
      {
        name: "Total Subscribers",
        value: "71,897",
        previousValue: "70,946",
        change: "12%",
        changeType: "positive",
      },
      {
        name: "Avg. Open Rate",
        value: "58.16%",
        previousValue: "56.14%",
        change: "2.02%",
        changeType: "positive",
      },
      {
        name: "Avg. Click Rate",
        value: "24.57%",
        previousValue: "28.62%",
        change: "4.05%",
        changeType: "negative",
      },
    ],
  },
}
