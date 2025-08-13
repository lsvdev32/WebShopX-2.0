import { Button } from '@/components/ui/button'

/**
 * Componente de paginación para la búsqueda de productos
 * @param {*} param0 - Objeto que contiene las propiedades de paginación
 * @returns JSX.Element | null - retorna un elemento JSX con los botones de paginación o null si no hay páginas
 */
export default function Pagination ({ pages, currentPage, getFilterUrl, navigate }) {
  // Si no hay páginas, retorna null
  if (pages <= 1) return null

  return (
    <div className='flex justify-center gap-2 mt-6'>
      {[...Array(pages).keys()].map((x) => (
        <Button
          key={x + 1}
          variant={Number(currentPage) === x + 1 ? 'default' : 'outline'}
          size='sm'
          onClick={() => navigate(getFilterUrl({ page: x + 1 }))}
          aria-label={`Ir a la página ${x + 1}`}
        >
          {x + 1}
        </Button>
      ))}
    </div>
  )
}
