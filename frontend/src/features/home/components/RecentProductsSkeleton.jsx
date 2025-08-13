import Container from '@/components/common/Container'
import CardWrapper from '@/components/common/CardWrapper'

/**
 * Skeleton de la seccion de productos recientes que se muestra en la pagina de inicio.
 */

export default function RecentProductsSkeleton () {
  return (
    <section className='py-6'>
      <Container>
        <CardWrapper className='p-6'>
          <div className='h-6 w-1/3 bg-gray-200 rounded mb-4 animate-pulse' />
          <div className='h-64 bg-gray-200 rounded' />
        </CardWrapper>
      </Container>
    </section>
  )
}
