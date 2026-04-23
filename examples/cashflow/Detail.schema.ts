import { z } from 'zod'

export const commentSchema = z.object({
  body: z.string().min(1, 'Escreva um comentário'),
})

export type Comment = z.infer<typeof commentSchema>
