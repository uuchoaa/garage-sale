import type { Meta, StoryObj } from "@storybook/react-vite"
import { DataTable } from "./DataTable"
import type { Column, RowGroup } from "./DataTable"

const meta: Meta<typeof DataTable> = {
  title: "Blocks/DataTable",
  component: DataTable,
}
export default meta

type Story = StoryObj<typeof DataTable>

// --- Flat (people) ---

interface Person extends Record<string, unknown> {
  name: string
  title: string
  email: string
  role: string
}

const personColumns: Column<Person>[] = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
]

const flatRows: Person[] = [
  { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
  { name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
  { name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },
  { name: "Whitney Francis", title: "Copywriter", email: "whitney.francis@example.com", role: "Admin" },
  { name: "Leonard Krasner", title: "Senior Designer", email: "leonard.krasner@example.com", role: "Owner" },
  { name: "Floyd Miles", title: "Principal Designer", email: "floyd.miles@example.com", role: "Member" },
]

export const Flat: Story = {
  render: () => (
    <DataTable<Person>
      columns={personColumns}
      rows={flatRows}
    />
  ),
}

// --- Grouped (transactions by date) ---

interface Transaction extends Record<string, unknown> {
  description: string
  category: string
  amount: string
  status: string
}

const transactionColumns: Column<Transaction>[] = [
  { key: "description", label: "Description" },
  { key: "category", label: "Category" },
  { key: "amount", label: "Amount", align: "right" },
  { key: "status", label: "Status" },
]

const groupedRows: RowGroup<Transaction>[] = [
  {
    label: "Today — Apr 22, 2026",
    rows: [
      { description: "Figma Subscription", category: "Software", amount: "$15.00", status: "Paid" },
      { description: "AWS EC2 Instance", category: "Infrastructure", amount: "$42.80", status: "Paid" },
    ],
  },
  {
    label: "Yesterday — Apr 21, 2026",
    rows: [
      { description: "Office Supplies", category: "Operations", amount: "$8.50", status: "Paid" },
      { description: "Domain Renewal", category: "Infrastructure", amount: "$12.00", status: "Paid" },
      { description: "Contractor Invoice", category: "Services", amount: "$750.00", status: "Pending" },
    ],
  },
  {
    label: "Apr 20, 2026",
    rows: [
      { description: "GitHub Teams", category: "Software", amount: "$21.00", status: "Paid" },
      { description: "Conference Travel", category: "Travel", amount: "$324.00", status: "Reimbursed" },
    ],
  },
]

export const Grouped: Story = {
  render: () => (
    <DataTable<Transaction>
      columns={transactionColumns}
      groups={groupedRows}
    />
  ),
}

// --- Empty ---

export const Empty: Story = {
  render: () => (
    <DataTable<Person>
      columns={personColumns}
      rows={[]}
      emptyMessage="No team members found. Invite someone to get started."
    />
  ),
}
