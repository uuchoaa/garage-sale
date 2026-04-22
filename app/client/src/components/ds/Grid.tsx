import React from "react"

interface GridProps {
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
}

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
}

const gapMap = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
}

export function Grid({ cols = 1, gap = "md", children, className }: GridProps) {
  return (
    <div className={`grid ${colsMap[cols]} ${gapMap[gap]} ${className ?? ""}`}>
      {children}
    </div>
  )
}
