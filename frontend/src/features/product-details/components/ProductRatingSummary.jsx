import Ratings from '@/components/common/Ratings'

/**
 * Componente para mostrar el resumen de calificaciones de un producto.
 * Muestra la calificación promedio, el número total de reseñas y un desglose por estrellas.
 * @param {*} param0 - Objeto que contiene los detalles del producto.
 * @returns {JSX.Element} - Componente de resumen de calificaciones del producto.
 */
export default function ProductRatingSummary ({ product }) {
  /**
   * Calcula el número total de reseñas y las calificaciones promedio.
   * Si no hay reseñas, se muestra un valor por defecto.
   */
  const totalReviews = product.numReviews || 0
  const ratings = product.ratings || 0
  const reviewCounts = {
    5: product.reviews?.filter((r) => r.ratings === 5).length || 0,
    4: product.reviews?.filter((r) => r.ratings === 4).length || 0,
    3: product.reviews?.filter((r) => r.ratings === 3).length || 0,
    2: product.reviews?.filter((r) => r.ratings === 2).length || 0,
    1: product.reviews?.filter((r) => r.ratings === 1).length || 0
  }

  return (
    <div className='py-6'>
      <div className='flex'>
        <div className='w-1/3'>
          <h2 className='text-xl font-bold mb-2'>Reseñas y calificaciones</h2>
          <div className='flex items-center gap-2 mb-1'>
            <Ratings ratings={ratings} />
            <span>({ratings.toFixed(1)} de 5)</span>
          </div>
          <p className='text-sm text-gray-700'>Basado en {totalReviews} reseñas en total</p>
        </div>
        <div className='w-2/3 space-y-2'>
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className='flex items-center gap-3'>
              <span className='ml-2 text-xs text-gray-600'>
                {stars} {stars === 1 ? 'estrella' : 'estrellas'}
              </span>
              <div className='flex-1 bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-[#1a2238] h-2 rounded-full'
                  style={{ width: totalReviews ? `${(reviewCounts[stars] / totalReviews) * 100}%` : '0%' }}
                />
              </div>
              <span className='text-xs text-gray-600'>{reviewCounts[stars]}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className='mt-6 border-t border-gray-200' />
    </div>
  )
}
