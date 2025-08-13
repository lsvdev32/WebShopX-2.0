/**
 * Componente que muestra un carrusel infinito de logotipos de marcas
 */

import * as Logos from '@/assets/infinite-silider-svgs'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { useRef } from 'react'
import AnimatedSection from './AnimatedSection'
import Container from './Container'

export function InfiniteCarouselOfBrands () {
  const ref = useRef(null)

  return (
    <AnimatedSection>
      <section ref={ref}>
        <Container>
          <InfiniteSlider ref={ref} gap={42} speed={30} reverse>
            {Object.entries(Logos).map(([name, src]) => (
              <div key={name} className='flex items-center justify-center h-12 w-32'>
                <img
                  src={src}
                  alt={`${name} logo`}
                  className='max-h-full max-w-full object-contain '
                />
              </div>
            ))}
          </InfiniteSlider>
        </Container>
      </section>
    </AnimatedSection>
  )
}
