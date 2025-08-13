/**
 * Custom hook para manejar productos en la sección de administración.
 * Permite obtener, eliminar, editar y crear productos.
 */

import getError from '@/components/common/Error'
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router'
import { deleteProduct, fetchProducts } from '../services/productService'

/**
 * Estado inicial del hook.
 * Contiene el estado de los productos, la carga, errores y el producto seleccionado.
 */
const initialState = {
  selectedProduct: null,
  openModal: false,
  products: [],
  loading: true,
  error: null,
  loadingDelete: false
}

/**
 * Reducer para manejar el estado de los productos.
 * Maneja acciones como la carga de productos, eliminación, selección y estado del modal.
 * @param {*} state - Estado actual del hook.
 * @param {*} action - Acción a procesar.
 * @returns {Object} - Nuevo estado del hook.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true }
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        products: state.products.filter((p) => p._id !== action.payload)
      }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false }
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload, openModal: true }
    case 'TOGGLE_MODAL':
      return { ...state, openModal: action.payload, selectedProduct: action.payload ? state.selectedProduct : null }
    default:
      return state
  }
}

export default function useProducts () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { state: authState } = useContext(Store)
  const { userInfo } = authState
  const navigate = useNavigate()

  /**
   * Efecto para redirigir al usuario a la página de inicio de sesión
   * si no es un administrador.
   */
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin?redirect=/products')
    }
  }, [userInfo, navigate])

  /**
   * Efecto para cargar los productos al montar el componente.
   * Realiza una petición a la API para obtener los productos y actualiza el estado.
   */
  useEffect(() => {
    const loadProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const data = await fetchProducts(userInfo.token)
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
      loadProducts()
    }
  }, [userInfo])

  /**
   * Maneja la eliminación de un producto.
   * Despacha acciones para actualizar el estado y muestra notificaciones.
   * @param {*} productId - ID del producto a eliminar.
   */
  const handleDeleteProduct = async (productId) => {
    dispatch({ type: 'DELETE_REQUEST' })
    try {
      await deleteProduct(productId, userInfo.token)
      dispatch({ type: 'DELETE_SUCCESS', payload: productId })
      toast({
        description: 'Producto eliminado correctamente.'
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
   * Maneja la edición de un producto.
   * Despacha una acción para establecer el producto seleccionado.
   * @param {*} product - Producto a editar.
   */
  const handleEditProduct = (product) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product })
  }

  /**
   * Maneja la creación de un nuevo producto.
   * Despacha una acción para limpiar el producto seleccionado.
   */
  const handleCreateProduct = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null })
  }

  /**
   * Maneja el éxito de la creación o actualización de un producto.
   * Despacha acciones para cerrar el modal y recargar los productos.
   */
  const handleUpdateSuccess = () => {
    dispatch({ type: 'TOGGLE_MODAL', payload: false })
    fetchProducts(userInfo.token).then((data) => {
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
      toast({
        description: 'Producto creado/actualizado correctamente.'
      })
    }).catch((error) => {
      toast({
        title: 'Error',
        description: getError(error),
        variant: 'destructive'
      })
    })
  }

  /**
   * Maneja el cambio de estado del modal.
   * Despacha una acción para abrir o cerrar el modal.
   * @param {*} open - Indica si el modal debe abrirse o cerrarse.
   */
  const handleToggleModal = (open) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: open })
  }

  /**
   * Retorna el estado y las funciones del hook
   * para que puedan ser utilizados en los componentes.
   */

  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
    loadingDelete: state.loadingDelete,
    selectedProduct: state.selectedProduct,
    openModal: state.openModal,
    handleDeleteProduct,
    handleEditProduct,
    handleCreateProduct,
    handleUpdateSuccess,
    handleToggleModal
  }
}
