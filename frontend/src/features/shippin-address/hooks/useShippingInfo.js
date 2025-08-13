import { Store } from '@/context/Store'
import { ShippingSchema } from '@/features/shippin-address/validations/ShippingSchema'
import { toast } from '@/hooks/use-toast'
import { calculateSavings, calculateShipping } from '@/utils/pricing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { saveShippingInfo } from '../services/shippingService'
import { PaymentMethodSchema } from '../validations/PaymentMethodSchema'

/**
 * Hook para manejar la información de envío
 * @returns {object} Control, errors, handleSubmit, subtotal, shippingCost, savings, total, cartItems, userInfo
 * @description Este hook maneja la información de envío, incluyendo la validación del formulario,
 */
const FormSchema = ShippingSchema.merge(PaymentMethodSchema)

export default function useShippingInfo () {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress, cartItems }
  } = state

  /**
   * Calcular el subtotal, costo de envío, ahorros y total
   * @returns {number} subtotal, shippingCost, savings, total
   */
  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  const shippingCost = cartItems.length === 0 ? 0 : calculateShipping(subtotal)
  const savings = cartItems.length === 0 ? 0 : calculateSavings(subtotal, shippingCost)
  const total = subtotal + shippingCost - savings

  /**
   * Configurar el formulario con react-hook-form
   * @returns {object} control, handleSubmit, formState
   */
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: shippingAddress.fullName || '',
      phone: shippingAddress.phone || '',
      address: shippingAddress.address || '',
      city: shippingAddress.city || '',
      postalCode: shippingAddress.postalCode || '',
      country: shippingAddress.country || '',
      paymentMethod: 'PayPal'
    }
  })

  /**
   * Verificar si el usuario está autenticado
   * si no está autenticado, redirigir a la página de inicio de sesión
   */
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping')
    }
  }, [userInfo, navigate])

  /**
   * Enviar la información de envío
   * @param {*} data - Datos del formulario
   * @description Esta función guarda la información de envío y redirige al usuario a la página de "place-order".
   * Si ocurre un error, muestra un mensaje de error.
   */
  const sendInformation = (data) => {
    try {
      saveShippingInfo(ctxDispatch, {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country
      }, data.paymentMethod)
      toast({
        description: 'Información de envío guardada exitosamente.'
      })
      navigate('/place-order')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar la información de envío.',
        variant: 'destructive'
      })
    }
  }

  return {
    control,
    errors,
    handleSubmit: handleSubmit(sendInformation),
    subtotal,
    shippingCost,
    savings,
    total,
    cartItems,
    userInfo
  }
}
