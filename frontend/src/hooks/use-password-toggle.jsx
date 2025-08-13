import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

/**
 * Hook para alternar la visibilidad de la contraseña
 * @returns {Array} - Un arreglo que contiene el tipo de input ('text' o 'password') y un icono para alternar la visibilidad
 */
export default function UsePasswordToggle () {
  const [visible, setVisible] = useState(false)

  /**
   * Icono que cambia entre Eye y EyeOff dependiendo del estado de visibilidad
   * al hacer clic, alterna el estado de visibilidad
   */
  const Icon = (
    <div onClick={() => setVisible(visibility => !visibility)}>
      {visible ? <EyeOff /> : <Eye />}
    </div>
  )

  /**
   * Tipo de input que cambia entre 'text' y 'password' dependiendo del estado de visibilidad
   */
  const InputType = visible ? 'text' : 'password'
  return [InputType, Icon]
}
