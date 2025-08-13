import { z } from 'zod'

/**
 * Validación para el formulario de restablecimiento de contraseña.
 * @module ResetPasswordValidation
 */

export const ResetPasswordValidation = z.object({
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  confirmPassword: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})
