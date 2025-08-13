/**
 * Hook para manejar el restablecimiento de contraseña del usuario.
 * Utiliza el token de restablecimiento de contraseña obtenido de la URL.
 */

import { toast } from '@/hooks/use-toast'
import { useNavigate, useParams } from 'react-router'
import { resetPassword } from '../services/authService'

export const useResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()

  /**
   * Función para restablecer la contraseña del usuario.
   * @param {*} data - Objeto que contiene la nueva contraseña.
   */
  const resetUserPassword = async (data) => {
    try {
      await resetPassword(token, { password: data.password })
      toast({
        title: 'Contraseña restablecida',
        description: 'Tu contraseña ha sido restablecida correctamente.'
      })
      navigate('/signin')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al tratar de restablecer la contraseña.',
        variant: 'destructive'
      })
    }
  }

  /**
   * Hook que retorna la función para restablecer la contraseña del usuario.
   * Lo utilizamos en el componente de restablecimiento de contraseña.
   */
  return { resetUserPassword }
}
