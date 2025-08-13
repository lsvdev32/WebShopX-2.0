import getError from '@/components/common/Error'
import { toast } from '@/hooks/use-toast'
import { useEffect, useReducer } from 'react'
import {
  fetchCategories,
  fetchPromos,
  fetchRandomProducts,
  fetchRecentProducts,
  fetchTopSellingProducts
} from '../services/homeService'

/**
 * Función reductora para manejar el estado de la carga de datos en useHomeData
 * @param {*} state - Estado actual
 * @param {*} action - Acción a procesar
 * @returns {*} Nuevo estado basado en la acción
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

/**
 * Hook para manejar la carga de datos en la página de inicio
 * Utiliza un reducer para gestionar el estado de la carga de productos, promociones y categorías
 * @returns {Object} Objeto con el estado de carga, error y los datos obtenidos
 */
export default function useHomeData () {
  /**
   * Inicializa el estado con useReducer
   * Contiene loading, error, topSellingProducts, randomProducts, recentProducts, promos, categories
   * Cada uno de estos estados se actualizará según las acciones disparadas por las peticiones
  */
  const [{ loading, error, topSellingProducts, randomProducts, recentProducts, promos, categories }, dispatch] = useReducer(reducer, {
    loading: true,
    error: null,
    topSellingProducts: [],
    randomProducts: [],
    recentProducts: [],
    promos: [],
    categories: []
  })

  /**
   * Efecto que se ejecuta al montar el componente
   * Realiza múltiples peticiones para obtener productos más vendidos, productos aleatorios, productos recientes
   */
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const [topSelling, random, recent, promosData, categoriesData] = await Promise.all([
          fetchTopSellingProducts(),
          fetchRandomProducts(),
          fetchRecentProducts(),
          fetchPromos(),
          fetchCategories()
        ])
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'topSellingProducts', data: topSelling } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'randomProducts', data: random } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'recentProducts', data: recent } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'promos', data: promosData } })
        dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'categories', data: categoriesData } })
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
  }, [])

  return {
    loading,
    error,
    topSellingProducts,
    randomProducts,
    recentProducts,
    promos,
    categories
  }
}
