import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'

/**
 * Componente de esqueleto para la búsqueda de productos
 * @returns JSX.Element - Retorna un elemento JSX con el esqueleto de la búsqueda de productos
 * @description Este componente se utiliza para mostrar un esqueleto de carga mientras se obtienen
 */
export default function SearchProductsSkeleton () {
  return (
    <div className='container mx-auto px-4 py-8 animate-pulse'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='hidden md:block md:col-span-1'>
          <CardWrapper className='sticky top-4'>
            <CardContent className='p-4'>
              <div className='space-y-6'>
                <div className='h-6 w-1/3 bg-gray-200 rounded' />
                <div className='space-y-2'>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className='h-4 w-full bg-gray-200 rounded' />
                  ))}
                </div>
                <div className='h-6 w-1/3 bg-gray-200 rounded' />
                <div className='space-y-2'>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className='h-4 w-full bg-gray-200 rounded' />
                  ))}
                </div>
              </div>
            </CardContent>
          </CardWrapper>
        </div>
        <div className='md:col-span-3'>
          <div className='flex justify-between mb-6'>
            <div className='h-4 w-1/4 bg-gray-200 rounded' />
            <div className='h-10 w-32 bg-gray-200 rounded' />
          </div>
          <div className='space-y-4'>
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
      </div>
    </div>
  )
}
