import AnimatedSection from '@/components/common/AnimatedSection'
import CardWrapper from '@/components/common/CardWrapper'
import { MessageBox } from '@/components/common/MessageBox'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import ProductDetails from '../components/ProductDetails'
import ProductViewSkeleton from '../components/ProductDetailScreenSkeleton'
import ProductGallery from '../components/ProductGallery'
import ProductTabs from '../components/ProductTabs'
import useProductDetails from '../hooks/useProductDetails'

/**
 * Componente para mostrar los detalles de un producto.
 * Utiliza el hook `useProductDetails` para obtener la información del producto,
 * @returns {JSX.Element} Componente renderizado con los detalles del producto.
 */
export default function ProductDetailsScreen () {
  /**
   * Extrae el parámetro 'link' de la URL que se utiliza para identificar el producto.
  */
  const { link } = useParams()
  const {
    loading,
    error,
    product,
    addProductToCart,
    userInfo,
    handleReviewSubmit,
    loadingCreateReview,
    userReview,
    showReviewForm,
    toggleReviewForm,
    reviewsRef
  } = useProductDetails(link)

  return (
    <AnimatedSection>
      <CardWrapper className='p-6'>
        {loading
          ? (
            <ProductViewSkeleton />
            )
          : error
            ? (
              <MessageBox variant='danger'>{error}</MessageBox>
              )
            : product
              ? (
                <>
                  <Helmet>
                    <title>{product.name} | WebShopX</title>
                  </Helmet>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2'>
                      <ProductGallery images={product.images || []} />
                      <ProductTabs
                        product={product}
                        userInfo={userInfo}
                        onReviewSubmit={handleReviewSubmit}
                        loadingCreateReview={loadingCreateReview}
                        userReview={userReview}
                        showReviewForm={showReviewForm}
                        toggleReviewForm={toggleReviewForm}
                        reviewsRef={reviewsRef}
                      />
                    </div>
                    <div>
                      <ProductDetails product={product} onAddToCart={addProductToCart} />
                    </div>
                  </div>
                </>
                )
              : (
                <p className='text-gray-500 p-4'>No se encontró el producto.</p>
                )}
      </CardWrapper>
    </AnimatedSection>
  )
}
