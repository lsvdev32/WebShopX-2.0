import getError from '@/components/common/Error'
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  fetchConversionRate,
  fetchOrder,
  fetchPayPalClientId,
  payOrder
} from '../services/orderService'

/**
 * Hook para manejar el pago de órdenes.
 * Proporciona funcionalidades para cargar la orden, manejar el pago con PayPal y gestionar el estado de la aplicación.
 */
const initialState = {
  loading: true,
  error: '',
  order: {},
  successPay: false,
  loadingPay: false,
  paymentProcessing: false
}

/**
 * Reducer para manejar el estado del pago de órdenes.
 * Maneja acciones como solicitud de carga, éxito de carga, fallo de carga, solicitud de pago, éxito de pago, fallo de pago y reinicio del estado de pago.
 * @param {*} state - Estado actual del pago de órdenes.
 * @param {*} action - Acción a procesar.
 * @returns {*} Nuevo estado del pago de órdenes.
 */
function reducer (state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true, paymentProcessing: true }
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true, paymentProcessing: false, order: action.payload }
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, paymentProcessing: false }
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, paymentProcessing: false }
    default:
      return state
  }
}

/**
 * Hook para manejar el pago de órdenes.
 * Proporciona funcionalidades para cargar la orden, manejar el pago con PayPal y gestionar el estado de la aplicación.
 * Utiliza el contexto de la tienda para acceder al estado del usuario y las funciones de navegación
 * @returns {Object} - Objeto con el estado del pago, funciones para crear la orden de PayPal, aprobar el pago y manejar errores.
 */
export default function useOrderPayment () {
  const [{ loading, error, order, successPay, loadingPay, paymentProcessing }, dispatch] = useReducer(reducer, initialState)
  const { state } = useContext(Store)
  const { userInfo } = state
  const { id: orderId } = useParams()
  const navigate = useNavigate()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const [conversionRate, setConversionRate] = useState(null)
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false)

  /**
   * Efecto para redirigir al usuario a la página de inicio de sesión si no está autenticado.
   * Redirige a la página de inicio de sesión con un parámetro de redirección a la orden actual.
   */
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/order/' + orderId)
    }
  }, [userInfo, navigate, orderId])

  /**
   * Efecto para cargar la tasa de conversión inicial.
   * Intenta obtener la tasa de conversión desde el servicio y maneja errores en caso de fallo.
   * Si falla, establece una tasa de conversión predeterminada y muestra un mensaje de error.
   * Esta tasa se utiliza para convertir el precio de la orden a USD antes de crear la orden de PayPal.
   */
  useEffect(() => {
    const loadConversionRate = async () => {
      try {
        const rate = await fetchConversionRate()
        setConversionRate(rate)
      } catch (err) {
        toast({
          title: 'Error',
          description: 'No se pudo obtener la tasa de conversión. Usando tasa predeterminada.',
          variant: 'destructive'
        })
        setConversionRate(0.00027) // Fallback
      }
    }
    loadConversionRate()
  }, [])

  /**
   * Carga la orden desde el servidor.
   * Utiliza el ID de la orden y el token del usuario para hacer la solicitud.
   */
  const loadOrder = useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' })
      const data = await fetchOrder(orderId, userInfo?.token)
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      toast({
        title: 'Error',
        description: getError(err),
        variant: 'destructive'
      })
    }
  }, [orderId, userInfo])

  /**
   * Carga el script de PayPal si no está cargado.
   * Utiliza el token del usuario para obtener el ID del cliente de PayPal.
   */
  const loadPaypalScript = useCallback(async () => {
    if (paypalScriptLoaded) return
    try {
      const clientId = await fetchPayPalClientId(userInfo?.token)
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD'
        }
      })
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      setPaypalScriptLoaded(true)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudo cargar el script de PayPal.',
        variant: 'destructive'
      })
    }
  }, [paypalDispatch, userInfo, paypalScriptLoaded])

  /**
   * Efecto para cargar la orden y el script de PayPal.
   * Se ejecuta cuando el ID de la orden cambia, la orden no está pagada,
   * el script de PayPal no está cargado y no hay una solicitud de pago pendiente.
   * Si la orden ya está pagada, no se vuelve a cargar.
   */
  useEffect(() => {
    if (!order._id || (order._id && order._id !== orderId)) {
      loadOrder()
    } else if (!order.isPaid && !paypalScriptLoaded && !isPending) {
      loadPaypalScript()
    }
  }, [order._id, orderId, order.isPaid, isPending, loadOrder, loadPaypalScript, paypalScriptLoaded])

  /**
   * Efecto para redirigir al usuario a la página de la orden después de un pago exitoso.
   * Resetea el estado de pago y navega a la página de la orden utilizando el ID de la orden.
   * Se ejecuta cuando el pago es exitoso y la orden tiene un ID.
   */
  useEffect(() => {
    if (successPay && order._id) {
      dispatch({ type: 'PAY_RESET' })
      navigate(`/order/${order._id}`)
    }
  }, [successPay, order._id, navigate])

  /**
   * Crea una orden de PayPal.
   * Convierte el total de la orden a USD utilizando la tasa de conversión.
   */
  const createPayPalOrder = useCallback((data, actions) => {
    if (!conversionRate) {
      toast({
        title: 'Error',
        description: 'Tasa de conversión no disponible. Intente de nuevo.',
        variant: 'destructive'
      })
      return Promise.reject(new Error('Tasa de conversión no disponible'))
    }
    const totalUSD = order.totalPrice * conversionRate
    return actions.order
      .create({
        purchase_units: [{ amount: { value: totalUSD.toFixed(2) } }]
      })
      .then((orderID) => orderID)
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'No se pudo crear la orden de PayPal.',
          variant: 'destructive'
        })
        throw err
      })
  }, [order.totalPrice, conversionRate])

  /**
   * Maneja la aprobación del pago de PayPal.
   * Captura el pago y actualiza el estado de la orden.
   */
  const onApprovePayPal = useCallback((data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        dispatch({ type: 'PAY_REQUEST' })
        const data = await payOrder(order._id, details, userInfo?.token)
        dispatch({ type: 'PAY_SUCCESS', payload: data })
        toast({
          description: 'Orden pagada exitosamente.'
        })
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) })
        toast({
          title: 'Error',
          description: getError(err),
          variant: 'destructive'
        })
      }
    }).catch((err) => {
      dispatch({ type: 'PAY_FAIL', payload: getError(err) })
      toast({
        title: 'Error',
        description: 'Error al capturar el pago de PayPal.',
        variant: 'destructive'
      })
    })
  }, [order._id, userInfo])

  /**
   * Maneja errores de PayPal.
   * Muestra un mensaje de error utilizando el hook de toast.
   */
  const onPayPalError = useCallback((err) => {
    dispatch({ type: 'PAY_FAIL', payload: getError(err) })
    toast({
      title: 'Error',
      description: getError(err),
      variant: 'destructive'
    })
  }, [])

  return {
    loading,
    error,
    order,
    isPending,
    loadingPay,
    paymentProcessing,
    userInfo,
    createPayPalOrder,
    onApprovePayPal,
    onPayPalError
  }
}
