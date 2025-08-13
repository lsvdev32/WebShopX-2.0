import getError from '@/components/common/Error'
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react'
import { useNavigate } from 'react-router'
import { fetchUserOrders } from '../services/orderHistoryService'

/**
 * Reducer para manejar el estado de las órdenes del usuario.
 * @param {*} state - Estado actual
 * @param {*} action - Acción a procesar
 * @returns Nuevo estado
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * Hook para manejar el historial de órdenes del usuario.
 * Permite filtrar por ID de orden y ordenar por fecha (reciente o más antigua).
 * @returns { loading, error, orders, searchQuery, setSearchQuery, sortOrder, setSortOrder }
 * - loading: indica si se está cargando la información.
 * - error: mensaje de error si ocurre algún problema.
 * - orders: lista de órdenes del usuario filtradas y ordenadas.
 */
export default function useOrderHistory () {
  const { state } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: null,
    orders: []
  })

  /**
   * Hook para manejar el estado de búsqueda y ordenamiento de órdenes.
   * - searchQuery: cadena de búsqueda para filtrar órdenes por ID.
   * - setSearchQuery: función para actualizar la cadena de búsqueda.
   * - sortOrder: orden de las órdenes ('recent' para más reciente primero, 'oldest' para más antiguo primero).
   * - setSortOrder: función para actualizar el orden de las órdenes.
   */
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('recent')

  /**
   * Efecto para cargar las órdenes del usuario al montar el componente.
   * Si no hay usuario autenticado, redirige a la página de inicio de sesión
   */
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
      return
    }

    /**
     * Carga las órdenes del usuario desde el servicio.
     * Maneja el estado de carga y posibles errores.
     */
    const loadOrders = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const data = await fetchUserOrders(userInfo.token)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
        toast({
          title: 'Error',
          description: getError(err),
          variant: 'destructive'
        })
      }
    }
    loadOrders()
  }, [userInfo, navigate])

  /**
   * Filtra y ordena las órdenes del usuario según la cadena de búsqueda y el orden seleccionado.
   * - Filtra las órdenes por ID si se proporciona una cadena de búsqueda.
   * - Ordena las órdenes por fecha, ya sea de más reciente a más antiguo o viceversa.
   * @returns {Array} Lista de órdenes filtradas y ordenadas.
   */
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders]

    if (searchQuery) {
      result = result.filter((order) =>
        order._id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return sortOrder === 'recent' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [orders, searchQuery, sortOrder])

  return {
    loading,
    error,
    orders: filteredAndSortedOrders,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder
  }
}
