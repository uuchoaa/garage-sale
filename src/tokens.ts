export type Tone = 'positive' | 'negative' | 'warning' | 'neutral' | 'accent'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

export type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Duration = 'fast' | 'normal' | 'slow'

export type Easing = 'standard' | 'enter' | 'exit' | 'spring'

export type Distance = 'sm' | 'md' | 'lg'

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl'

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>
