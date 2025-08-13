/**
 * Este componente lo utilizamos para envolver en un contenedor los modulos o componente que deseemos
 * ${className}: Inserta las clases personalizadas que pasas cuando usamos el componente
 * y concatena las clases globales creadas aquí con las específicadas en cada componente de forma individual.
 *
 * Con este componente conseguimos que todos los componentes tengan un diseño uniforme
 * y que se adapten a diferentes tamaños de pantalla.
 */
export default function Container ({ children, className }) {
  return (
    <div className={`sm:container sm:max-w-7xl sm:mx-auto px-4 py-6 ${className}`}>{children}</div>
  )
}
