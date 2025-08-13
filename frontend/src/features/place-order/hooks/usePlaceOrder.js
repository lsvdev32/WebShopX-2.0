/* eslint-disable no-undef */
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { calculateSavings, calculateShipping } from '@/utils/pricing'
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router'
import { createOrder } from '../services/orderService'

/**
 * Hook para manejar la creación de órdenes en el proceso de compra.
 * Proporciona estado de carga, error, y funciones para crear una orden.
 */
const initialState = {
  loading: false,
  error: null
}

/**
 * Reducer para manejar el estado de la creación de órdenes.
 * Maneja acciones de solicitud, éxito y fallo.
 * @param {*} state - Estado actual del hook.
 * @param {*} action - Acción a procesar.
 * @returns Nuevo estado del hook.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true, error: null }
    case 'CREATE_SUCCESS':
      return { ...state, loading: false }
    case 'CREATE_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * Hook para manejar la lógica de creación de órdenes.
 * Incluye validaciones de autenticación y carrito, cálculos de precios,
 * y la función para crear una orden.
 * @returns Objeto con estado de carga, error, carrito, usuario, totales y función para crear orden.
 */
export default function usePlaceOrder () {
  const [{ loading, error }, dispatch] = useReducer(reducer, initialState)
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  const navigate = useNavigate()

  /**
   * Calcula el subtotal, costo de envío, ahorros y total de la orden.
   * Utiliza los artículos del carrito para calcular estos valores.
   */
  const subtotal = cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  const shippingCost = cart.cartItems.length === 0 ? 0 : calculateShipping(subtotal)
  const savings = cart.cartItems.length === 0 ? 0 : calculateSavings(subtotal, shippingCost)
  const total = subtotal + shippingCost - savings

  /**
   * Efecto para validar el estado del usuario y del carrito antes de crear una orden.
   * Redirige al usuario a la página de inicio de sesión si no está autenticado,
   * a la página del carrito si no hay artículos, o a la página de envío si faltan datos de envío o método de pago.
   */
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/place-order')
    } else if (cart.cartItems.length === 0) {
      navigate('/cart')
    } else if (!cart.shippingAddress.address || !cart.paymentMethod) {
      navigate('/shipping')
    }
  }, [userInfo, cart, navigate])

  /**
   * Función para crear una orden.
   * Envía los datos de la orden al servidor y maneja la respuesta.
   */
  const handleCreateOrder = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' })
      const orderData = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shippingCost,
        savingsPrice: savings,
        totalPrice: total
      }
      const data = await createOrder(orderData, userInfo.token)
      ctxDispatch({ type: 'CART_CLEAR' })
      localStorage.removeItem('cartItems')
      dispatch({ type: 'CREATE_SUCCESS' })
      toast({
        description: 'Orden creada exitosamente.'
      })
      navigate(`/order/${data.order._id}`)
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL', payload: err.response?.data?.message || err.message })
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'No se pudo crear la orden.',
        variant: 'destructive'
      })
    }
  }

  return {
    loading,
    error,
    cart,
    userInfo,
    subtotal,
    shippingCost,
    savings,
    total,
    handleCreateOrder
  }
}
