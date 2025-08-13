/**
 * Con este componente se protege una ruta para que solo los administradores puedan acceder a ella.
 * Si el usuario no es administrador, se redirige a la página de inicio de sesión
 */

import { Store } from '@/context/Store'
import { useContext } from 'react'
import { Navigate } from 'react-router'

export default function AdminRoute ({ children }) {
  const { state } = useContext(Store)
  const { userInfo } = state

  /**
   * Si el usuario está autenticado y es administrador, se renderiza el componente hijo.
   * Si no, se redirige a la página de inicio de sesión.
   */
  return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin' />
}
