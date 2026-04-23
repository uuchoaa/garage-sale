import { z } from 'zod'

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'Obrigatório'),
  lastName: z.string().min(1, 'Obrigatório'),
  email: z.string().email('E-mail inválido'),
  username: z.string().min(3, 'Mínimo de 3 caracteres'),
  timezone: z.string(),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Obrigatório'),
    newPassword: z.string().min(8, 'Mínimo de 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export const logoutOthersSchema = z.object({
  password: z.string().min(1, 'Obrigatório'),
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type ChangePassword = z.infer<typeof changePasswordSchema>
export type LogoutOthers = z.infer<typeof logoutOthersSchema>
