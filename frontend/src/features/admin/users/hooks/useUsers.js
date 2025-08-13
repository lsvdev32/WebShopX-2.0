import getError from '@/components/common/Error'
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router'
import { deleteUser, fetchUsers } from '../services/userServices'

/**
 * Custom hook para gestionar usuarios en el panel de administración.
 */
const initialState = {
  selectedUser: null,
  openModal: false,
  users: [],
  loading: true,
  error: null,
  loadingDelete: false
}

/**
 * Reducer para manejar el estado de los usuarios.
 * @param {*} state el estado actual del hook.
 * @param {*} action esta acción que describe cómo actualizar el estado.
 * @returns El nuevo estado basado en la acción recibida.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true }
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        users: state.users.filter((user) => user._id !== action.payload)
      }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false }
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload, openModal: true }
    case 'TOGGLE_MODAL':
      return { ...state, openModal: action.payload, selectedUser: action.payload ? state.selectedUser : null }
    default:
      return state
  }
}

export default function useUsers () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { state: authState } = useContext(Store)
  const { userInfo } = authState
  const navigate = useNavigate()

  /**
   * Efecto para redirigir al usuario si no es administrador.
   * Si el usuario no está autenticado o no es administrador, lo redirige a la página de inicio de sesión.
   */
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin?redirect=/users')
    }
  }, [userInfo, navigate])

  /**
   * Efecto para cargar la lista de usuarios al montar el componente.
   * Si el usuario es administrador, se realiza una solicitud para obtener los usuarios.
   */
  useEffect(() => {
    const loadUsers = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const data = await fetchUsers(userInfo.token)
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
      loadUsers()
    }
  }, [userInfo])

  /**
   * Maneja la eliminación de un usuario.
   * Despacha acciones para actualizar el estado y muestra notificaciones.
   * @param {*} userId ID del usuario a eliminar.
   */
  const handleDeleteUser = async (userId) => {
    dispatch({ type: 'DELETE_REQUEST' })
    try {
      await deleteUser(userId, userInfo.token)
      dispatch({ type: 'DELETE_SUCCESS', payload: userId })
      toast({
        description: 'Usuario eliminado correctamente.'
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
   * Maneja la edición de un usuario.
   * Despacha una acción para establecer el usuario seleccionado y abrir el modal de edición.
   * @param {*} user El usuario a editar.
   */
  const handleEditUser = (user) => {
    dispatch({ type: 'SET_SELECTED_USER', payload: user })
  }

  /**
   * Maneja el éxito de la actualización de un usuario.
   * Cierra el modal, recarga la lista de usuarios y muestra una notificación de éxito.
   * Si ocurre un error, muestra una notificación de error.
   */
  const handleUpdateSuccess = () => {
    dispatch({ type: 'TOGGLE_MODAL', payload: false })
    fetchUsers(userInfo.token).then((data) => {
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
      toast({
        description: 'Usuario actualizado correctamente.'
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
   * Maneja la apertura o cierre del modal.
   * Despacha una acción para actualizar el estado del modal.
   * @param {*} open Indica si el modal debe abrirse o cerrarse.
   */
  const handleToggleModal = (open) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: open })
  }

  return {
    users: state.users,
    loading: state.loading,
    error: state.error,
    loadingDelete: state.loadingDelete,
    selectedUser: state.selectedUser,
    openModal: state.openModal,
    handleDeleteUser,
    handleEditUser,
    handleUpdateSuccess,
    handleToggleModal
  }
}
