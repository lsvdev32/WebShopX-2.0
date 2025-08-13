/**
 * Validaciones para la creación de productos
 * utilizando Zod.
 */

import { z } from 'zod'

export const CreateProductSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe contener mínimo 3 caracteres'
  }),
  link: z.string().min(3, {
    message: 'Por favor ingrese una URL válida'
  }),
  images: z.array(z.string().url({ message: 'Cada imagen debe ser una URL válida' }))
    .min(3, { message: 'Debes subir al menos 3 imágenes' }),
  brand: z.string().min(2, {
    message: 'La marca debe contener mínimo 2 caracteres'
  }),
  category: z.string().min(3, {
    message: 'La categoría debe contener mínimo 3 caracteres'
  }),
  description: z.string().min(10, {
    message: 'La descripción debe contener mínimo 10 caracteres'
  }),
  price: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z.number().min(1, {
      message: 'El precio debe ser mayor a 0'
    })
  ),
  stock: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().min(1, {
      message: 'La cantidad disponible debe ser mayor a 0'
    })
  )
})
