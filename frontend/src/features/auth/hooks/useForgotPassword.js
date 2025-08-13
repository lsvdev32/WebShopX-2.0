/**
 * Con este hook se maneja el proceso de restablecimiento de contraseña.
 * Permite enviar un correo electrónico para restablecer la contraseña del usuario.
 */

import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router'
import { forgotPassword } from '../services/authService'

export const useForgotPassword = () => {
  const navigate = useNavigate()

  /**
   * Envía un correo electrónico para restablecer la contraseña del usuario.
   * Si la solicitud es exitosa, muestra un mensaje de éxito y redirige al usuario a la página de inicio de sesión.
   * Si ocurre un error, muestra un mensaje de error.
   * @param {*} data - Datos del formulario de restablecimiento de contraseña.
   */
  const sendResetEmail = async (data) => {
    try {
      const result = await forgotPassword(data)
      if (result && result.message) {
        toast({
          title: 'Correo enviado',
          description: 'Hemos enviado un correo electrónico para restablecer tu contraseña'
        })
        navigate('/signin')
      } else {
        throw new Error('Respuesta inesperada del servidor')
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al tratar de enviar el correo',
        variant: 'destructive'
      })
    }
  }

  /**
   * Retorna la función sendResetEmail para que pueda ser utilizada en otros componentes
   * La utilizamos en el formulario de restablecimiento de contraseña
  */
  return { sendResetEmail }
}
