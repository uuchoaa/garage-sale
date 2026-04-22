import type { Meta, StoryObj } from "@storybook/react-vite"
import { Alert } from "./Alert"

const meta: Meta<typeof Alert> = {
  title: "Blocks/Alert",
  component: Alert,
  args: { children: "Texto de alerta informativo." },
}
export default meta

type Story = StoryObj<typeof Alert>

export const Success: Story = { args: { variant: "success", children: "Configurações salvas com sucesso." } }
export const Danger: Story = { args: { variant: "danger", children: "Sua autenticação expirou. Reconecte para continuar." } }
export const Warning: Story = { args: { variant: "warning", children: "Seu plano está próximo do limite." } }
export const Muted: Story = { args: { variant: "muted", children: "Conecte este canal para começar a publicar." } }

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <Alert variant="success">Configurações salvas com sucesso.</Alert>
      <Alert variant="danger">Sua autenticação expirou. Reconecte para continuar.</Alert>
      <Alert variant="warning">Seu plano está próximo do limite.</Alert>
      <Alert variant="muted">Conecte este canal para começar a publicar.</Alert>
    </div>
  ),
}
