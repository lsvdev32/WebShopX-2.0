/**
 * Componete para secciones animadas
 */
import useIntersectionObserver from '@/features/home/hooks/useIntersectionObserver'

export default function AnimatedSection ({ children, className = '' }) {
  const { ref } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <section ref={ref} className={`item-animation ${className}`}>
      {children}
    </section>
  )
}
