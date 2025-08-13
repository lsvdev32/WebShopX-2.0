import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

/**
 * Componente para mostrar un esqueleto de carga en la sección de pago de pedidos.
 * Este componente utiliza animaciones de pulsación para indicar que los datos están cargando.
 * @returns {JSX.Element} Un esqueleto de carga para la sección de pago de pedidos.
 */

export default function OrderPaymentSkeleton () {
  return (
    <section className='py-6 animate-pulse'>
      <div className='h-8 w-1/3 bg-gray-200 rounded mb-6' />
      <Separator className='mb-6 border-t-2 border-gray-200' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <section className='lg:col-span-2 space-y-6'>
          {[...Array(2)].map((_, index) => (
            <article key={index}>
              <CardWrapper>
                <CardContent className='py-4'>
                  <div className='h-6 w-1/3 bg-gray-200 rounded mb-4' />
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className='h-4 w-full bg-gray-200 rounded mb-2' />
                  ))}
                  <div className='h-10 w-full bg-gray-200 rounded mt-2' />
                </CardContent>
              </CardWrapper>
            </article>
          ))}
          <article>
            <CardWrapper>
              <CardContent className='py-4'>
                <div className='h-6 w-1/3 bg-gray-200 rounded mb-4' />
                {[...Array(2)].map((_, i) => (
                  <div key={i} className='flex space-x-4 mb-4'>
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
        <aside>
          <CardWrapper>
            <CardContent className='py-4'>
              <div className='h-6 w-1/3 bg-gray-200 rounded mb-4' />
              {[...Array(3)].map((_, i) => (
                <div key={i} className='flex justify-between mb-2'>
                  <div className='h-4 w-1/3 bg-gray-200 rounded' />
                  <div className='h-4 w-1/4 bg-gray-200 rounded' />
                </div>
              ))}
              <div className='h-10 w-full bg-gray-200 rounded mt-4' />
            </CardContent>
          </CardWrapper>
        </aside>
      </div>
    </section>
  )
}
