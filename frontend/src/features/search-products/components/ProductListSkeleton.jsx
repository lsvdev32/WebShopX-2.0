import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'

/**
 * Componente de esqueleto para la lista de productos
 * @returns JSX.Element - Retorna un elemento JSX con el esqueleto de la lista de productos
 * @description Este componente se utiliza para mostrar un esqueleto de carga mientras se obtienen los datos de los productos.
 */
export default function ProductListSkeleton () {
  return (
    <div className='space-y-4 animate-pulse'>
      <div className='flex justify-between mb-6'>
        <div className='h-4 w-1/4 bg-gray-200 rounded' />
        <div className='h-10 w-32 bg-gray-200 rounded' />
      </div>
      <div className='space-y-4 md:space-y-0 md:grid md:grid-cols-1 md:gap-4'>
        {[...Array(5)].map((_, i) => (
          <CardWrapper key={i} className='p-4'>
            <CardContent className='flex flex-col md:flex-row gap-6'>
              <div className='md:w-48 h-48 bg-gray-200 rounded-md' />
              <div className='flex-1 space-y-4'>
                <div className='h-6 w-3/4 bg-gray-200 rounded' />
                <div className='h-4 w-1/2 bg-gray-200 rounded' />
                <div className='flex items-center gap-4'>
                  <div className='h-4 w-24 bg-gray-200 rounded' />
                </div>
                <div className='h-6 w-1/4 bg-gray-200 rounded' />
              </div>
            </CardContent>
          </CardWrapper>
        ))}
      </div>
    </div>
  )
}
