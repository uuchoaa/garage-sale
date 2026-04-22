import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={`border-b border-border pb-4 mb-4 ${className ?? ""}`}>
      {children}
    </div>
  )
}

function CardBody({ children, className }: CardBodyProps) {
  return <div className={className}>{children}</div>
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 shadow-xs ${className ?? ""}`}
    >
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
