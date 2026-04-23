import type { Tone } from '../tokens'

export const badgeClass: Record<Tone, string> = {
  positive: 'bg-tone-positive-50 text-tone-positive-700 ring-tone-positive-500/20',
  negative: 'bg-tone-negative-50 text-tone-negative-700 ring-tone-negative-500/20',
  warning: 'bg-tone-warning-50 text-tone-warning-700 ring-tone-warning-500/20',
  neutral: 'bg-tone-neutral-50 text-tone-neutral-700 ring-tone-neutral-500/20',
  accent: 'bg-tone-accent-50 text-tone-accent-700 ring-tone-accent-500/20',
}

export const dotClass: Record<Tone, string> = {
  positive: 'bg-tone-positive-500',
  negative: 'bg-tone-negative-500',
  warning: 'bg-tone-warning-500',
  neutral: 'bg-tone-neutral-500',
  accent: 'bg-tone-accent-500',
}
