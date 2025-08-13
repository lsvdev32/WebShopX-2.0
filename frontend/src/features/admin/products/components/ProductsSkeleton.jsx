/**
 * Skeleton de carga para la sección de productos en el panel de administración.
 * Muestra un diseño de carga mientras se obtienen los datos del servidor.
 */

import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'

export default function ProductsSkeleton () {
  return (
    <section className='w-full py-6 animate-pulse'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <div className='h-8 w-1/3 bg-gray-200 rounded' />
          <div className='h-4 w-2/3 bg-gray-200 rounded mt-2' />
        </div>
        <div className='h-10 w-32 bg-gray-200 rounded' />
      </div>
      <CardWrapper>
        <CardContent className='py-4'>
          <div className='grid grid-cols-9 gap-4 mb-4'>
            {[...Array(9)].map((_, index) => (
              <div key={index} className='h-4 bg-gray-200 rounded' />
            ))}
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='grid grid-cols-9 gap-4 py-2'>
              {[...Array(9)].map((_, i) => (
                <div key={i} className='h-4 bg-gray-200 rounded' />
              ))}
            </div>
          ))}
        </CardContent>
      </CardWrapper>
    </section>
  )
}
