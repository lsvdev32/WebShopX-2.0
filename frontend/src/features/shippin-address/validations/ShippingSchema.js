import { z } from 'zod'

/**
 * Esquema de validación para la dirección de envío
 */
export const ShippingSchema = z.object({
  fullName: z.string().min(5, { message: 'El nombre debe contener al menos 5 caracteres' })
    .max(120, { message: 'El  nombre debe contener 120 caracteres como maximo' }),

  phone: z.string().min(10, { message: 'El número de télefono debe contener al menos 10 digítos' }),

  address: z.string().min(10, { message: 'La dirección debe contener al menos 10 caracteres' })
    .max(150, { message: 'La dirección debe contener como maximo 150 caracteres' }),

  city: z.string().min(3, { message: 'La ciudad debe contener al menos 3 caracteres' })
    .max(150, { message: 'La ciudad debe contener 150 caracteres como maximo' }),

  postalCode: z.string().min(5, { message: 'El codigo postal debe contener al menos 5 números' }),

  country: z.string().min(3, { message: 'El pais debe contener al menos 3 caracteres' })
    .max(100, { message: 'El pais debe contener al menos 150 caracteres como maximo' })
})
