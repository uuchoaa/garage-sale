import React from "react"

interface GridProps {
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg" | "none"
  /** Add a divider between cells along the given axis */
  divide?: "x" | "y"
  /** Wrap the grid in an inset-ring card border (used in stats-card pattern) */
  border?: boolean
  children: React.ReactNode
  className?: string
}

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

const gapMap = {
  none: "gap-px",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
}

const divideMap = {
  x: "divide-x divide-border",
  y: "divide-y divide-border",
}

export function Grid({
  cols = 1,
  gap = "md",
  divide,
  border = false,
  children,
  className,
}: GridProps) {
  const classes = [
    "grid",
    colsMap[cols],
    divide ? divideMap[divide] : gapMap[gap],
    border ? "overflow-hidden rounded-lg inset-ring inset-ring-border shadow-sm dark:shadow-none" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}
