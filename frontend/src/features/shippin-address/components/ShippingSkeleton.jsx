import CardWrapper from '@/components/common/CardWrapper'

/**
 * Skeleton de carga de la pagina de envio
 * @returns {JSX.Element}
 */
export default function ShippingSkeleton () {
  return (
    <div className='flex flex-col md:flex-row gap-8 animate-pulse'>
      <article className='w-full md:w-2/3'>
        <CardWrapper className='p-6'>
          <div className='space-y-4'>
            <div className='h-6 w-1/3 bg-gray-200 rounded' />
            {[...Array(4)].map((_, index) => (
              <div key={index} className='space-y-2'>
                <div className='h-4 w-1/4 bg-gray-200 rounded' />
                <div className='h-10 w-full bg-gray-200 rounded' />
              </div>
            ))}
          </div>
        </CardWrapper>
      </article>
      <aside className='w-full md:w-1/3 space-y-4'>
        <CardWrapper className='p-6'>
          <div className='space-y-3'>
            <div className='h-6 w-1/3 bg-gray-200 rounded' />
            {[...Array(3)].map((_, index) => (
              <div key={index} className='flex justify-between'>
                <div className='h-4 w-1/3 bg-gray-200 rounded' />
                <div className='h-4 w-1/4 bg-gray-200 rounded' />
              </div>
            ))}
            <div className='h-10 w-full bg-gray-200 rounded' />
          </div>
        </CardWrapper>
        <CardWrapper className='p-6'>
          <div className='h-6 w-1/3 bg-gray-200 rounded' />
          <div className='h-10 w-full bg-gray-200 rounded mt-4' />
        </CardWrapper>
      </aside>
    </div>
  )
}
