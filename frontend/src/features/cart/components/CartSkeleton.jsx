import CardWrapper from '@/components/common/CardWrapper'

/**
 * Skeleton de carga para el carrito de compras.
 * Muestra un diseño de carga mientras se obtienen los datos del carrito.
 * @returns {JSX.Element} Componente de esqueleto del carrito de compras.
 */
export default function CartSkeleton () {
  return (
    <CardWrapper className='lg:col-span-2 p-6 animate-pulse'>
      <div className='mb-6'>
        <div className='h-8 w-1/3 bg-gray-200 rounded' />
      </div>
      <div className='space-y-4'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-6 flex items-center space-x-4'>
              <div className='w-16 h-16 bg-gray-200 rounded-lg' />
              <div className='flex-1 space-y-2'>
                <div className='h-4 w-3/4 bg-gray-200 rounded' />
                <div className='h-3 w-1/2 bg-gray-200 rounded' />
              </div>
            </div>
            <div className='col-span-3 flex justify-center'>
              <div className='h-10 w-20 bg-gray-200 rounded' />
            </div>
            <div className='col-span-3 flex items-center justify-end space-x-4'>
              <div className='h-4 w-16 bg-gray-200 rounded' />
              <div className='h-8 w-8 bg-gray-200 rounded-full' />
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  )
}
