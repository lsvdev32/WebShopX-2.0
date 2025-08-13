import getError from '@/components/common/Error'
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router'
import { deleteOrder, fetchOrders, markOrderAsDelivered } from '../services/orderService'

/**
 * Con initial state inicializamos el estado del hook useOrders.
 * Contiene propiedades para manejar el estado de carga, error, lista de órdenes,
 */
const initialState = {
  loading: true,
  error: null,
  orders: [],
  loadingUpdate: false,
  loadingDelete: false
}

/**
 * Reducer para manejar las acciones del estado de las órdenes.
 * @param {*} state estado actual del hook useOrders.
 * @param {*} action acción que se va a procesar.
 * @returns nuevo estado basado en la acción.
 * Cada caso maneja una acción específica como FETCH_REQUEST, FETCH_SUCCESS, etc.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'DELIVER_REQUEST':
      return { ...state, loadingUpdate: true }
    case 'DELIVER_SUCCESS':
      return {
        ...state,
        loadingUpdate: false,
        orders: state.orders.map(order =>
          order._id === action.payload.orderId
            ? { ...order, isDelivered: true, deliveredAt: action.payload.deliveredAt }
            : order
        )
      }
    case 'DELIVER_FAIL':
      return { ...state, loadingUpdate: false }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true }
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        orders: state.orders.filter(order => order._id !== action.payload)
      }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false }
    default:
      return state
  }
}

export default function useOrders () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { state: authState } = useContext(Store)
  const { userInfo } = authState
  const navigate = useNavigate()

  /**
   * Verifica si el usuario es administrador.
   * Si no es administrador, redirige a la página de inicio de sesión.
   */
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin?redirect=/orders')
    }
  }, [userInfo, navigate])

  /**
   * Carga las órdenes del usuario administrador.
   * Utiliza el token del usuario para autenticar la solicitud.
   */
  useEffect(() => {
    const loadOrders = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const data = await fetchOrders(userInfo.token)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
        toast({
          title: 'Error',
          description: getError(error),
          variant: 'destructive'
        })
      }
    }
    if (userInfo?.isAdmin) {
      loadOrders()
    }
  }, [userInfo])

  /**
   * esta función maneja la acción de marcar una orden como entregada.
   * Despacha una acción de solicitud de entrega, llama al servicio para marcar la orden como entregada,
   * y actualiza el estado con la información de la entrega.
   * @param {*} orderId es la ID de la orden que se va a marcar como entregada.
   */
  const handleMarkAsDelivered = async (orderId) => {
    dispatch({ type: 'DELIVER_REQUEST' })
    try {
      const data = await markOrderAsDelivered(orderId, userInfo.token)
      dispatch({
        type: 'DELIVER_SUCCESS',
        payload: { orderId, deliveredAt: data.deliveredAt || new Date().toISOString() }
      })
      toast({
        description: 'Orden marcada como entregada.'
      })
    } catch (error) {
      dispatch({ type: 'DELIVER_FAIL' })
      toast({
        title: 'Error',
        description: getError(error),
        variant: 'destructive'
      })
    }
  }

  /**
   * Esta función maneja la acción de eliminar una orden.
   * Despacha una acción de solicitud de eliminación, llama al servicio para eliminar la orden,
   * y actualiza el estado eliminando la orden de la lista.
   * @param {*} orderId es la ID de la orden que se va a eliminar.
   */
  const handleDeleteOrder = async (orderId) => {
    dispatch({ type: 'DELETE_REQUEST' })
    try {
      await deleteOrder(orderId, userInfo.token)
      dispatch({ type: 'DELETE_SUCCESS', payload: orderId })
      toast({
        description: 'Orden eliminada correctamente.'
      })
    } catch (error) {
      dispatch({ type: 'DELETE_FAIL' })
      toast({
        title: 'Error',
        description: getError(error),
        variant: 'destructive'
      })
    }
  }

  /**
   * Esta función maneja la acción de ver los detalles de una orden.
   * Redirige al usuario a la página de detalles de la orden utilizando su ID.
   * @param {*} orderId es la ID de la orden que se va a ver.
   */
  const handleViewDetails = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  /**
   * Retorna el estado y las funciones del hook useOrders.
   * Incluye la lista de órdenes, estado de carga, errores,
   * y funciones para manejar acciones como marcar como entregada, eliminar y ver detalles.
   */
  return {
    orders: state.orders,
    loading: state.loading,
    error: state.error,
    loadingUpdate: state.loadingUpdate,
    loadingDelete: state.loadingDelete,
    handleMarkAsDelivered,
    handleDeleteOrder,
    handleViewDetails
  }
}
