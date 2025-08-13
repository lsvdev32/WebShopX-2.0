/* eslint-disable multiline-ternary */
import AnimatedSection from '@/components/common/AnimatedSection'
import Container from '@/components/common/Container'
import { MessageBox } from '@/components/common/MessageBox'
import { PromoBanner } from '@/components/common/PromoBanner'
import FashionPromoSkeleton from './FashionPromoSkeleton'

/**
 * Sección de promociones de moda.
 * Muestra un banner de promoción con imágenes y texto. Se puede reutilizar y mostrar diferentes promociones.
 * @param {*} param0 - Objeto que contiene las promociones, estado de carga y error.
 * @returns {JSX.Element} Componente de sección de promociones de moda.
 */

export default function FashionPromoSection ({ promos, loading, error }) {
  const fashionPromo = promos[0] // Asumiendo que promos es un array y queremos mostrar la primera promoción

  return (
    <AnimatedSection>
      <Container>
        {loading ? (
          <FashionPromoSkeleton />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <>
            <PromoBanner
              discount='40%'
              title={fashionPromo.title}
              subtitle='Oferta por tiempo limitado. ¡Compra ahora antes de que se acabe la oferta!'
              buttonText='Comprar ahora'
              leftImageSrc='https://http2.mlstatic.com/D_NQ_NP788030-MLA77598162724_072024-B.webp'
              rightImageSrc='https://http2.mlstatic.com/D_NQ_NP821928-MLA77597652454_072024-B.webp'
            />
          </>
        )}
      </Container>
    </AnimatedSection>
  )
}
