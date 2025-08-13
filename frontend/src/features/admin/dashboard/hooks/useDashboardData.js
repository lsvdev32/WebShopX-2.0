import getError from '@/components/common/Error'
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router'
import {
  fetchDashboardSummary,
  fetchOrderStatus,
  fetchSalesByCategory,
  fetchTopProducts,
  fetchUsersByDay
} from '../services/dashboardService'

/**
 * Con la función reducer se maneja el estado de la aplicación para la obtención de datos del dashboard.
 * @param {*} state nos permite acceder al estado actual del dashboard.
 * @param {*} action sirve para definir las acciones que se pueden realizar sobre el estado.
 * @returns El nuevo estado del dashboard después de aplicar la acción.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, [action.payload.key]: action.payload.data }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default function useDashboardData () {
  const { state } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()

  /**
   * useReducer se utiliza para manejar el estado del dashboard, incluyendo la carga de datos y el manejo de errores.
   * @returns Un objeto que contiene el estado actual del dashboard, incluyendo loading, error, summary, usersByDay, orderStatus, salesByCategory y topProducts.
   * @typedef {Object} DashboardState
   */
  const [{ loading, error, summary, usersByDay, orderStatus, salesByCategory, topProducts }, dispatch] = useReducer(reducer, {
    loading: true,
    error: null,
    summary: {},
    usersByDay: [],
    orderStatus: [],
    salesByCategory: [],
    topProducts: []
  })

  /**
   * useEffect se utiliza para cargar los datos del dashboard cuando el componente se monta.
   * Si no hay información del usuario, redirige a la página de inicio de sesión
   */
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
      return
    }

    /**
     * loadData es una función asíncrona que se encarga de cargar los datos del dashboard.
     * Utiliza Promise.all para realizar múltiples solicitudes de datos de manera concurrente.
     */
    const loadData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const [summaryData, usersData, statusData, categorySalesData, topProductsData] = await Promise.all([
          fetchDashboardSummary(userInfo.token),
          fetchUsersByDay(userInfo.token),
          fetchOrderStatus(userInfo.token),
          fetchSalesByCategory(userInfo.token),
          fetchTopProducts(userInfo.token)
        ])
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'summary', data: summaryData } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'usersByDay', data: usersData } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'orderStatus', data: statusData } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'salesByCategory', data: categorySalesData } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'topProducts', data: topProductsData } })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
        toast({
          title: 'Error',
          description: getError(err),
          variant: 'destructive'
        })
      }
    }
    loadData()
  }, [userInfo, navigate])

  return {
    loading,
    error,
    summary,
    usersByDay,
    orderStatus,
    salesByCategory,
    topProducts
  }
}
