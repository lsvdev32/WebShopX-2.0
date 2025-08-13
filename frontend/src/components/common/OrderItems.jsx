/**
 * Este componente muestra los productos de un pedido o carrito de compras.
 * Permite editar el carrito si se proporciona la prop `editCart`.
 *
 * Lo utiliza: OrderDetails, CartPage, OrderPaymentScreen, PlaceOrderScreen
 */
import CardWrapper from '@/components/common/CardWrapper'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CardContent } from '@/components/ui/card'
import { formatPrice } from '@/utils/pricing'
import { Edit3 } from 'lucide-react'
import { Link } from 'react-router'

// Imagen de respaldo para productos sin imagen
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg'

export default function OrderItems ({ orderItems, textTitle, editCart }) {
  // Si no hay productos, mostramos un mensaje de error
  if (!Array.isArray(orderItems)) {
    return (
      <CardWrapper>
        <CardContent className='p-6'>
          <Alert variant='destructive'>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>No se pudieron cargar los productos.</AlertDescription>
          </Alert>
        </CardContent>
      </CardWrapper>
    )
  }

  // Validar si una URL es válida (básica)
  const isValidImageUrl = (url) => {
    return typeof url === 'string' && url.startsWith('http')
  }

  // Obtener la imagen del item
  const getItemImage = (item) => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0 && isValidImageUrl(item.images[0])) {
      return item.images[0]
    }
    if (
      item.product?.images &&
      Array.isArray(item.product.images) &&
      item.product.images.length > 0 &&
      isValidImageUrl(item.product.images[0])
    ) {
      return item.product.images[0]
    }
    return PLACEHOLDER_IMAGE
  }

  return (
    <CardWrapper>
      <CardContent className='p-6'>
        <div className='flex justify-between'>
          <h2 className='mb-2 text-lg font-semibold'>{textTitle}</h2>
          {editCart && (
            <Link to='/cart' className='text-blue-800 hover:underline pl-10' aria-label='Editar carrito de compras'>
              <p className='hidden sm:block font-light'>Editar carrito de compras</p>
              <Edit3 className='w-4 h-4 block sm:hidden' />
            </Link>
          )}
        </div>
        <ul className='divide-y divide-gray-200'>
          {orderItems.map((item) => (
            <li key={item._id} className='py-4 flex items-center'>
              <img
                src={getItemImage(item)}
                alt={item.name || 'Producto sin nombre'}
                className='w-20 h-20 object-contain flex-shrink-0 hover:scale-105 hover:cursor-pointer'
                onError={(e) => (e.target.src = PLACEHOLDER_IMAGE)} // Fallback si la imagen falla
              />
              <div className='ml-4 flex-grow'>
                <Link
                  to={`/product/${item.slug || item.link}`}
                  className='font-medium text-gray-900 hover:text-blue-500'
                  aria-label={`Ver detalles de ${item.name}`}
                >
                  {item.name}
                </Link>
                <p className='mt-1 text-sm text-gray-500'>
                  {item.quantity} x {formatPrice(item.price)} = {formatPrice(item.quantity * item.price)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </CardWrapper>
  )
}
