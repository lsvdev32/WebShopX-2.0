/**
 * Validación del esquema para editar usuarios.
 * Utiliza Zod para definir las reglas de validación de los campos.
 */

import { z } from 'zod'

export const editUserSchema = z.object({
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
    })
})
