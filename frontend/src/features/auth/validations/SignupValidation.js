import { z } from 'zod'

/**
 * Esquema de validación para el registro de usuario.
 * @type {z.ZodObject}
 */

export const SignupValidation = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre debe contener minimo 3 caracteres'
    })
    .max(120, {
      message: 'El nombre debe contener 120 caracteres como maximo'
    }),

  email: z.string().email({
    message: 'Por favor ingrese un email valido'
  }),

  phone: z.string()
    .min(10, {
      message: 'El telefono debe tener minimo 10 números'
    })
    .max(10, {
      message: 'El numero debe tener maximo 10 número'
    }),

  password: z.string().min(8, {
    message: 'La contraseña debe tener 8 caracteres como minimo'
  }),

  confirmPassword: z.string().min(8, {
    message: 'La contraseña debe tener 8 caracteres como minimo'
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })
})
