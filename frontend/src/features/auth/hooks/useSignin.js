/**
 * Hook para manejar el inicio de sesión de usuarios
 * y la integración con Google Sign-In.
 */

/* eslint-disable no-undef */
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { googleSignin, signin } from '../services/authService'

export const useSignin = (redirect) => {
  const navigate = useNavigate()
  const { dispatch: ctxDispatch } = useContext(Store) // usamos el contexto global del aplicativo

  /**
   * Función para manejar el inicio de sesión de un usuario.
   * @param {*} data - Datos del usuario para iniciar sesión.
   */
  const userSignin = async (data) => {
    try {
      const result = await signin(data)
      ctxDispatch({ type: 'USER_SIGNIN', payload: result })
      localStorage.setItem('userInfo', JSON.stringify(result))
      navigate(redirect)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Usuario o contraseña incorrecta!',
        variant: 'destructive'
      })
    }
  }

  /**
   * Función para manejar el registro de un usuario con Google Sign-In.
   * @param {*} credential - Credenciales obtenidas de Google Sign-In.
   */
  const googleRegistration = async (credential) => {
    try {
      const result = await googleSignin(credential)
      ctxDispatch({ type: 'USER_SIGNIN', payload: result })
      localStorage.setItem('userInfo', JSON.stringify(result))
      navigate(redirect)
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Error con Google Sign-In',
        variant: 'destructive'
      })
    }
  }

  /**
   * Retorna las funciones de inicio de sesión y registro con Google.
   */
  return { userSignin, googleRegistration }
}
