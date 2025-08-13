/**
 * Este componente es el slider de productos que se muestra en la página de inicio.
 * Utiliza el componente Carousel para mostrar los productos de forma deslizante.
 */

import CardProductSlider from '@/components/layout/products/CardProductSlider'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function ProductCarousel ({ products, className }) {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className='w-full'
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className={`basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 ${className}`}
          >
            <div className='p-1'>
              <CardProductSlider product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
