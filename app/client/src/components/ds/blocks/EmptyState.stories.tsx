import type { Meta, StoryObj } from "@storybook/react-vite"
import { Folder } from "lucide-react"
import { EmptyState } from "./EmptyState"

const meta: Meta<typeof EmptyState> = {
  title: "Blocks/EmptyState",
  component: EmptyState,
}
export default meta

type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: Folder,
    title: "Nenhum projeto encontrado",
    description: "Comece criando um novo projeto.",
    action: {
      label: "Novo Projeto",
      onClick: () => {},
    },
  },
}

export const WithoutIcon: Story = {
  args: {
    title: "Nenhum projeto encontrado",
    description: "Comece criando um novo projeto.",
    action: {
      label: "Novo Projeto",
      onClick: () => {},
    },
  },
}

export const WithoutAction: Story = {
  args: {
    icon: Folder,
    title: "Nenhum projeto encontrado",
    description: "Comece criando um novo projeto.",
  },
}
