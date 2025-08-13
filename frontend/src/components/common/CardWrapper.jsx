/**
 * Este componete es un envoltorio que utiliza el componente Card de la librería de componentes UI pero con una
 * className personalizada a mi gusto.
 */
import { Card } from '../ui/card'

export default function CardWrapper ({ children, className }) {
  return (
    <Card className={`border-none rounded-none sm:rounded-sm h-fit shadow-sm w-full ${className}`}>{children}</Card>
  )
}
