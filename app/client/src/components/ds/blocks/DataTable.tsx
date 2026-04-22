import { Fragment } from "react"

export interface Column<T> {
  key: keyof T & string
  label: string
  align?: "left" | "right"
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export interface RowGroup<T> {
  label: string
  rows: T[]
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  /** Flat rows — use when no grouping is needed */
  rows?: T[]
  /** Grouped rows — use for date/category grouping */
  groups?: RowGroup<T>[]
  /** Message shown when rows/groups are empty */
  emptyMessage?: string
}

function isFirstColumn(index: number) {
  return index === 0
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  groups,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  const isEmpty =
    (rows !== undefined && rows.length === 0) ||
    (groups !== undefined && groups.every((g) => g.rows.length === 0)) ||
    (rows === undefined && groups === undefined)

  const renderCell = (col: Column<T>, row: T, colIndex: number) => {
    const value = row[col.key]
    const content = col.render ? col.render(value, row) : (value as React.ReactNode)
    const alignClass = col.align === "right" ? "text-right" : "text-left"

    if (isFirstColumn(colIndex)) {
      return (
        <td
          key={col.key}
          className={`py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-foreground sm:pl-3 ${alignClass}`}
        >
          {content}
        </td>
      )
    }

    return (
      <td
        key={col.key}
        className={`px-3 py-4 text-sm whitespace-nowrap text-muted-foreground ${alignClass}`}
      >
        {content}
      </td>
    )
  }

  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                {columns.map((col, colIndex) => {
                  const alignClass = col.align === "right" ? "text-right" : "text-left"
                  if (isFirstColumn(colIndex)) {
                    return (
                      <th
                        key={col.key}
                        scope="col"
                        className={`py-3.5 pr-3 pl-4 text-sm font-semibold text-foreground sm:pl-3 ${alignClass}`}
                      >
                        {col.label}
                      </th>
                    )
                  }
                  return (
                    <th
                      key={col.key}
                      scope="col"
                      className={`px-3 py-3.5 text-sm font-semibold text-foreground ${alignClass}`}
                    >
                      {col.label}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {isEmpty && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}

              {!isEmpty && rows !== undefined &&
                rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col, colIndex) => renderCell(col, row, colIndex))}
                  </tr>
                ))}

              {!isEmpty && groups !== undefined &&
                groups.map((group) => (
                  <Fragment key={group.label}>
                    <tr className="border-t border-border">
                      <th
                        scope="colgroup"
                        colSpan={columns.length}
                        className="bg-muted py-2 pr-3 pl-4 text-left text-sm font-semibold text-foreground sm:pl-3"
                      >
                        {group.label}
                      </th>
                    </tr>
                    {group.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-border">
                        {columns.map((col, colIndex) => renderCell(col, row, colIndex))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
