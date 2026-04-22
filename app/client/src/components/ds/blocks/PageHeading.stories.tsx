import type { Meta, StoryObj } from "@storybook/react-vite"
import { PageHeading } from "./PageHeading"

const meta: Meta<typeof PageHeading> = {
  title: "Blocks/PageHeading",
  component: PageHeading,
}
export default meta

type Story = StoryObj<typeof PageHeading>

export const Default: Story = {
  args: {
    title: "Back End Developer",
  },
}

export const WithDescription: Story = {
  args: {
    title: "Back End Developer",
    description: "Manage job listings and candidate applications.",
  },
}

export const WithActions: Story = {
  render: () => (
    <PageHeading
      title="Back End Developer"
      description="Manage job listings and candidate applications."
      actions={
        <>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-xs inset-ring inset-ring-border hover:bg-muted"
          >
            Edit
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Publish
          </button>
        </>
      }
    />
  ),
}
