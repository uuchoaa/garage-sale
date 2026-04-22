import type { Meta, StoryObj } from "@storybook/react-vite"
import { DescriptionList } from "./DescriptionList"
import { StatusPill } from "./StatusPill"

const meta: Meta<typeof DescriptionList> = {
  title: "Blocks/DescriptionList",
  component: DescriptionList,
}
export default meta

type Story = StoryObj<typeof DescriptionList>

export const Default: Story = {
  args: {
    title: "Informações do Candidato",
    description: "Dados pessoais e detalhes da candidatura.",
    items: [
      { label: "Nome completo", value: "Margot Foster" },
      { label: "Cargo pretendido", value: "Desenvolvedora Back-end" },
      { label: "E-mail", value: "margotfoster@example.com" },
      { label: "Pretensão salarial", value: "R$ 12.000,00" },
    ],
  },
}

export const WithoutTitle: Story = {
  args: {
    items: [
      { label: "Nome completo", value: "Margot Foster" },
      { label: "Cargo pretendido", value: "Desenvolvedora Back-end" },
      { label: "E-mail", value: "margotfoster@example.com" },
      { label: "Pretensão salarial", value: "R$ 12.000,00" },
    ],
  },
}

export const WithNodeValue: Story = {
  args: {
    title: "Detalhes da Conta",
    description: "Situação atual e informações de acesso.",
    items: [
      { label: "Nome", value: "Margot Foster" },
      { label: "E-mail", value: "margotfoster@example.com" },
      {
        label: "Status",
        value: <StatusPill variant="success">Ativo</StatusPill>,
      },
      { label: "Perfil", value: "Administrador" },
    ],
  },
}
