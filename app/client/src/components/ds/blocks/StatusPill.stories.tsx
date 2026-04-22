import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusPill } from "./StatusPill"
import type { StatusPillVariant } from "./StatusPill"

const meta: Meta<typeof StatusPill> = {
  title: "Blocks/StatusPill",
  component: StatusPill,
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "danger", "warning", "neutral"] satisfies StatusPillVariant[],
    },
  },
}
export default meta

type Story = StoryObj<typeof StatusPill>

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusPill variant="success">Ativo</StatusPill>
      <StatusPill variant="danger">Suspenso</StatusPill>
      <StatusPill variant="warning">Pendente</StatusPill>
      <StatusPill variant="neutral">Inativo</StatusPill>
    </div>
  ),
}

export const Success: Story = {
  args: {
    variant: "success",
    children: "Ativo",
  },
}

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Suspenso",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Pendente",
  },
}

export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "Inativo",
  },
}
