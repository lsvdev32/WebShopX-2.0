/**
 * Con este componente protegemos las rutas que requieren autenticación.
 * Si el usuario no está autenticado, lo redirigimos a la página de inicio de sesión.
 * Si está autenticado, renderizamos los hijos del componente.
 */

import { Store } from '@/context/Store'
import { useContext } from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoute ({ children }) {
  const { state } = useContext(Store) // accedemos al estado global del aplicativo
  const { userInfo } = state

  /**
   * Si el usuario está autenticado (userInfo existe), renderizamos los hijos del componente.
   * Si no está autenticado, redirigimos a la página de inicio de sesión
   */
  return userInfo ? children : <Navigate to='/signin' />
}
