import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'

/**
 * Componente de esqueleto para la página de realizar pedido.
 * Muestra un diseño de carga mientras se obtienen los datos del pedido.
 * @returns JSX.Element - Un componente de esqueleto que simula la estructura de la página de realizar pedido.
 */
export default function PlaceOrderSkeleton () {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse'>
      <section className='lg:col-span-2 space-y-6'>
        <article>
          <CardWrapper>
            <CardContent className='py-4'>
              <div className='flex flex-col items-center mb-5'>
                <div className='h-8 w-2/3 bg-gray-200 rounded' />
                <div className='h-3 w-3/4 bg-gray-200 rounded mt-2' />
              </div>
              <div className='space-y-3 mb-2'>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className='h-4 w-full bg-gray-200 rounded' />
                ))}
              </div>
              <div className='h-4 w-1/3 bg-gray-200 rounded mt-2' />
            </CardContent>
          </CardWrapper>
        </article>
        <article>
          <CardWrapper>
            <CardContent className='py-4'>
              <div className='h-6 w-1/3 bg-gray-200 rounded mb-4' />
              {[...Array(2)].map((_, index) => (
                <div key={index} className='flex space-x-4 mb-4'>
                  <div className='h-16 w-16 bg-gray-200 rounded' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-3/4 bg-gray-200 rounded' />
                    <div className='h-3 w-1/2 bg-gray-200 rounded' />
                  </div>
                </div>
              ))}
            </CardContent>
          </CardWrapper>
        </article>
      </section>
      <aside className='md:col-span-1'>
        <CardWrapper>
          <CardContent className='py-4'>
            <div className='h-6 w-1/3 bg-gray-200 rounded mb-4' />
            {[...Array(3)].map((_, index) => (
              <div key={index} className='flex justify-between mb-2'>
                <div className='h-4 w-1/3 bg-gray-200 rounded' />
                <div className='h-4 w-1/4 bg-gray-200 rounded' />
              </div>
            ))}
            <div className='h-10 w-full bg-gray-200 rounded mt-4' />
          </CardContent>
        </CardWrapper>
      </aside>
    </div>
  )
}
