import type { Meta, StoryObj } from "@storybook/react-vite"
import { Grid } from "./Grid"

const meta: Meta<typeof Grid> = {
  title: "Primitives/Grid",
  component: Grid,
}
export default meta

type Story = StoryObj<typeof Grid>

const Cell = ({ label }: { label: string }) => (
  <div className="rounded bg-card p-4 text-sm text-muted-foreground">{label}</div>
)

export const TwoCols: Story = {
  render: () => (
    <Grid cols={2} gap="md">
      <Cell label="Célula 1" />
      <Cell label="Célula 2" />
    </Grid>
  ),
}

export const ThreeCols: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      <Cell label="Célula 1" />
      <Cell label="Célula 2" />
      <Cell label="Célula 3" />
    </Grid>
  ),
}

export const FourCols: Story = {
  render: () => (
    <Grid cols={4} gap="md">
      <Cell label="Célula 1" />
      <Cell label="Célula 2" />
      <Cell label="Célula 3" />
      <Cell label="Célula 4" />
    </Grid>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">gap="sm"</p>
        <Grid cols={3} gap="sm">
          <Cell label="A" /><Cell label="B" /><Cell label="C" />
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">gap="lg"</p>
        <Grid cols={3} gap="lg">
          <Cell label="A" /><Cell label="B" /><Cell label="C" />
        </Grid>
      </div>
    </div>
  ),
}

export const DivideX: Story = {
  render: () => (
    <Grid cols={3} divide="x">
      <div className="px-4 py-6 text-sm text-foreground">Stat A</div>
      <div className="px-4 py-6 text-sm text-foreground">Stat B</div>
      <div className="px-4 py-6 text-sm text-foreground">Stat C</div>
    </Grid>
  ),
}

export const WithBorder: Story = {
  render: () => (
    <Grid cols={3} divide="x" border>
      <div className="bg-card px-4 py-6 text-sm text-foreground">Stat A</div>
      <div className="bg-card px-4 py-6 text-sm text-foreground">Stat B</div>
      <div className="bg-card px-4 py-6 text-sm text-foreground">Stat C</div>
    </Grid>
  ),
}
