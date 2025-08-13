import { z } from 'zod'

/**
 * Esquema de validación para el inicio de sesión.
 * @type {z.ZodObject}
 */

export const SigninValidation = z.object({
  email: z.string().email({
    message: 'Por favor ingrese un email valido'
  }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener 8 caracteres como minimo'
  })
})
