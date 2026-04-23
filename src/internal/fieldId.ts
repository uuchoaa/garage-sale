let counter = 0

export function nextFieldId(prefix = 'field'): string {
  counter += 1
  return `${prefix}-${counter}`
}
