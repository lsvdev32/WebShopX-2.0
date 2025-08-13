import CardWrapper from '@/components/common/CardWrapper'
import { CardContent, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router'

/**
 * Componente para mostrar un resumen de la información de envío y métodos de pago.
 * @param {*} param0 - Objeto que contiene la dirección de envío y el método de pago.
 * @returns JSX.Element - Un componente que muestra la información de envío y métodos de pago.
 */
export default function ShippingSummary ({ shippingAddress, paymentMethod }) {
  return (
    <CardWrapper>
      <CardContent className='py-4'>
        <div className='flex flex-col items-center mb-5'>
          <CardTitle className='text-2xl font-semibold text-[#1a2238] text-center'>
            Información de envío y métodos de pago
          </CardTitle>
          <p className='text-xs text-gray-400'>
            Por favor verifique que la información de envío y métodos de pago esté correcta. Si no es así, corríjala.
          </p>
        </div>
        <div className='space-y-3 mb-2'>
          <p>
            <span className='text-lg font-semibold'>Nombre:</span> <span className='font-light'>{shippingAddress.fullName}</span>
          </p>
          <p>
            <span className='text-lg font-semibold'>Teléfono:</span> <span className='font-light'>{shippingAddress.phone}</span>
          </p>
          <p>
            <span className='text-lg font-semibold'>Dirección:</span> <span className='font-light'>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</span>
          </p>
          <p>
            <span className='text-lg font-semibold'>Método de pago:</span> <span className='font-light'>{paymentMethod}</span>
          </p>
        </div>
        <Link to='/shipping' className='text-blue-800 hover:underline font-light'>
          Editar información de envío o de pago
        </Link>
      </CardContent>
    </CardWrapper>
  )
}
