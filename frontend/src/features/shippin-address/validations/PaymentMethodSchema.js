import { z } from 'zod'

/**
 * Esquema de validación para el método de pago
 */
export const PaymentMethodSchema = z.object({
  paymentMethod: z.enum(['PayPal'], {
    required_error: 'Debes seleccionar un método de pago.'
  })
})
