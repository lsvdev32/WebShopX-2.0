import { useEffect, useState } from 'react'

/**
 * Hook para verificar si una consulta de medios es verdadera
 * @param {*} query - Consulta de medios a evaluar
 * @returns {boolean} - True si la consulta de medios es verdadera, false en caso contrario
 */
export function useMediaQuery (query) {
  const [matches, setMatches] = useState(false)

  /**
   * Efecto que se ejecuta al montar el componente y cada vez que cambia la consulta de medios
   * actualiza el estado matches si la consulta de medios es verdadera o falsa
   */
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}
