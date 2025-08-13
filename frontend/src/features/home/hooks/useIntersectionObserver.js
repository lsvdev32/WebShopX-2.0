/* eslint-disable no-undef */
import { useEffect, useRef } from 'react'

/**
 * Hook para observar la visibilidad de un elemento usando IntersectionObserver
 * @param {Object} options - Opciones de IntersectionObserver
 * @returns {Object} ref - Referencia al elemento observado
 * @returns {boolean} isVisible - Indica si el elemento es visible
 */
export default function useIntersectionObserver (options = { threshold: 0.3 }) {
  const ref = useRef(null)
  const isVisible = useRef(false)

  useEffect(() => {
    // Verificar soporte para IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      isVisible.current = true
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.current = true
            if (ref.current) {
              ref.current.classList.add('visible')
              observer.unobserve(entry.target)
            }
          }
        })
      },
      options
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isVisible: isVisible.current }
}
