import Container from '@/components/common/Container'
import SkeletonCard from '@/components/layout/products/SkeletonCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

/**
 * Skeleton de carga de la sección de productos
 * @returns {JSX.Element} Componente de esqueleto de productos
 */

export default function ProductsSectionSkeleton () {
  return (
    <section className='py-6'>
      <Container>
        <div className='block md:hidden'>
          <Carousel>
            <CarouselContent>
              {[...Array(4).keys()].map((x) => (
                <CarouselItem key={x} className='basis-[75%] px-2'>
                  <SkeletonCard />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className='hidden md:flex flex-wrap'>
          {[...Array(6).keys()].map((x) => (
            <div key={x} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mt-4'>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
