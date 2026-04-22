import { ArrowUp, ArrowDown } from "lucide-react"

export interface StatProps {
  /** Metric label */
  name: string
  /** Formatted value string (e.g. "$405,091.00") */
  value: string
  /** Optional change string (e.g. "+4.75%") */
  change?: string
  /** Direction of change */
  changeType?: "positive" | "negative"
  /** Previous period value for "from X" display (card variant only) */
  previousValue?: string
}

export interface StatsGridProps {
  stats: StatProps[]
  /** "gap" = gap-px separator grid (01-with-trending pattern)
   *  "card" = shared-borders card with divide-x (05-with-shared-borders pattern) */
  variant?: "gap" | "card"
}

function GapStat({ name, value, change, changeType }: StatProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-card px-4 py-10 sm:px-6 xl:px-8">
      <dt className="text-sm/6 font-medium text-muted-foreground">{name}</dt>
      {change && (
        <dd
          className={[
            changeType === "negative" ? "text-status-danger" : "text-foreground",
            "text-xs font-medium",
          ].join(" ")}
        >
          {change}
        </dd>
      )}
      <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-foreground">
        {value}
      </dd>
    </div>
  )
}

function CardStat({ name, value, change, changeType, previousValue }: StatProps) {
  const isPositive = changeType === "positive"
  return (
    <div className="px-4 py-5 sm:p-6">
      <dt className="text-base font-normal text-foreground">{name}</dt>
      <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div className="flex items-baseline text-2xl font-semibold text-primary">
          {value}
          {previousValue && (
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              from {previousValue}
            </span>
          )}
        </div>

        {change && (
          <div
            className={[
              isPositive
                ? "bg-status-success-subtle text-status-success"
                : "bg-status-danger-subtle text-status-danger",
              "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0",
            ].join(" ")}
          >
            {isPositive ? (
              <ArrowUp
                aria-hidden="true"
                className="mr-0.5 -ml-1 size-4 shrink-0 self-center"
              />
            ) : (
              <ArrowDown
                aria-hidden="true"
                className="mr-0.5 -ml-1 size-4 shrink-0 self-center"
              />
            )}
            <span className="sr-only">
              {isPositive ? "Increased" : "Decreased"} by{" "}
            </span>
            {change}
          </div>
        )}
      </dd>
    </div>
  )
}

export function Stat(props: StatProps & { variant?: "gap" | "card" }) {
  if (props.variant === "card") {
    return <CardStat {...props} />
  }
  return <GapStat {...props} />
}

export function StatsGrid({ stats, variant = "gap" }: StatsGridProps) {
  if (variant === "card") {
    return (
      <dl className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-lg bg-card shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0 dark:shadow-none dark:inset-ring dark:inset-ring-border">
        {stats.map((stat) => (
          <CardStat key={stat.name} {...stat} />
        ))}
      </dl>
    )
  }

  return (
    <dl className="grid grid-cols-1 gap-px bg-foreground/5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <GapStat key={stat.name} {...stat} />
      ))}
    </dl>
  )
}
