import AnimatedSection from '@/components/common/AnimatedSection'
import Container from '@/components/common/Container'
import { MessageBox } from '@/components/common/MessageBox'
import { PromoCard } from '@/components/common/PromoCard'
import PromoSectionSkeleton from './PromoSectionSkeleton'

/**
 * Seccion de promociones que se muestra en la pagina de inicio.
 * Muestra una lista de tarjetas de promociones.
 * @param {*} param0 - objeto que contiene las promociones, el estado de carga y el error.
 * @returns {JSX.Element} - Componente de seccion de promociones.
 */

export default function PromoSection ({ promos, loading, error }) {
  return (
    <AnimatedSection>
      <Container>
        {loading
          ? (
            <PromoSectionSkeleton />
            )
          : error
            ? (
              <MessageBox variant='danger'>{error}</MessageBox>
              )
            : (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {promos.map((promo) => (
                  <PromoCard
                    key={promo.id}
                    tagline={promo.tagline}
                    title={promo.title}
                    imageSrc={promo.imageSrc}
                    imageAlt={promo.imageAlt}
                  />
                ))}
              </div>
              )}
      </Container>
    </AnimatedSection>
  )
}
