/**
 * Hook para manejar el registro de usuarios.
 * Proporciona funciones para registrar usuarios con email y contraseña,
 */

/* eslint-disable no-undef */
import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { googleSignin, signup } from '../services/authService'

export const useSignup = (redirect) => {
  const navigate = useNavigate()
  const { dispatch: ctxDispatch } = useContext(Store)

  /**
   * Registra un usuario con email y contraseña.
   * @param {*} data - Datos del usuario para el registro.
   */
  const userRegistration = async (data) => {
    try {
      const result = await signup(data)
      ctxDispatch({ type: 'USER_SIGNIN', payload: result })
      localStorage.setItem('userInfo', JSON.stringify(result))
      navigate(redirect)
      toast({
        title: 'Bienvenido',
        description: 'Registro realizado con éxito!'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Se produjo un error al registrarse.',
        variant: 'destructive'
      })
    }
  }

  /**
   * Registra un usuario utilizando Google Sign-In.
   * @param {*} credential - Credenciales de Google del usuario.
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
   * Retorna las funciones de registro de usuario.
   */
  return { userRegistration, googleRegistration }
}
