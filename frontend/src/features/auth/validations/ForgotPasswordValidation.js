import { z } from 'zod'

/**
 * Validación para el formulario de recuperación de contraseña
 * @module ForgotPasswordValidation
 */

export const ForgotPasswordValidation = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' })
})
