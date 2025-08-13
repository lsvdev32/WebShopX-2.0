import { useState } from 'react'
import ProductDescription from './ProductDescription'
import ProductRatingSummary from './ProductRatingSummary'
import ProductDetailsForm from './ProductReviewForm'
import ProductReviews from './ProductReviews'

/**
 * Componente para mostrar las pestañas de detalles del producto.
 * Permite alternar entre la descripción del producto y las reseñas.
 * @param {*} param0 - Objeto que contiene el producto, información del usuario, función para enviar reseñas,
 * estado de carga de reseñas, referencia a las reseñas, estado de visibilidad del formulario de reseñas,
 * función para alternar el formulario de reseñas y la reseña del usuario.
 * @returns JSX.Element - Componente de pestañas de detalles del producto.
 */
export default function ProductTabs ({
  product,
  userInfo,
  onReviewSubmit,
  loadingCreateReview,
  reviewsRef,
  showReviewForm,
  toggleReviewForm,
  userReview
}) {
  // Estado para controlar la pestaña activa (descripción o reseñas)
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className='mt-8'>
      <div className='border-b flex'>
        <button
          onClick={() => setActiveTab('description')}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'description' ? 'border-b-2 border-black text-black' : 'text-gray-500'
          }`}
        >
          Descripción
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-2 px-4 font-medium text-sm flex items-center ${
            activeTab === 'reviews' ? 'border-b-2 border-black text-black' : 'text-gray-500'
          }`}
        >
          Reseñas
          {product.numReviews > 0 && (
            <span className='ml-1 bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded-full'>
              {product.numReviews}
            </span>
          )}
        </button>
      </div>
      <div className='py-4'>
        {activeTab === 'description' && <ProductDescription description={product.description} />}
        {activeTab === 'reviews' && (
          <div>
            <ProductRatingSummary product={product} />
            <div ref={reviewsRef}>
              <ProductReviews reviews={product.reviews} />
            </div>
            <div className='mt-4 text-center'>
              {userInfo && !showReviewForm && (
                <button onClick={toggleReviewForm} className='text-blue-600 hover:underline'>
                  ¿Quieres opinar sobre este producto?
                </button>
              )}
              {showReviewForm && (
                <ProductDetailsForm
                  userInfo={userInfo}
                  onSubmit={onReviewSubmit}
                  loading={loadingCreateReview}
                  userReview={userReview}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
