import CardWrapper from '@/components/common/CardWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils/pricing'

/**
 * Componente para mostrar el resumen del pedido.
 * Incluye detalles como el subtotal, gastos de envío, ahorros y total estimado.
 * @param {*} param0 - Objeto que contiene los detalles del pedido.
 * @returns {JSX.Element} Componente de resumen del pedido.
 */
export default function OrderSummary ({
  subtotal,
  shippingCost,
  savings,
  total,
  quantityOfProducts,
  buttonText,
  onClick,
  isDisabled
}) {
  return (
    <CardWrapper className='w-full bg-[#1a2238] text-gray-200 space-y-6'>
      <div className='p-6'>
        <h2 className='text-xl font-semibold mb-4'>Resumen</h2>
        <div className='space-y-3'>
          {quantityOfProducts !== undefined && (
            <div className='flex justify-between'>
              <p>Productos ({quantityOfProducts})</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
          )}
          {quantityOfProducts === undefined && (
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
          )}
          <div className='flex justify-between'>
            <p>Gastos de envío</p>
            {shippingCost === 0
              ? (
                <Badge variant='outline' className='text-green-600'>
                  Gratis
                </Badge>
                )
              : (
                <p>{formatPrice(shippingCost)}</p>
                )}
          </div>
          <div className='flex justify-between text-red-500'>
            <p>Ahorro total</p>
            <p>- {formatPrice(savings)}</p>
          </div>
          <Separator />
          <div className='flex justify-between font-semibold'>
            <p>Total estimado</p>
            <p>{formatPrice(total)}</p>
          </div>
          <Button
            className='w-full bg-white text-[#1a2238] hover:bg-gray-200 disabled:bg-[#bdc3c7] disabled:cursor-not-allowed py-3'
            onClick={onClick}
            disabled={isDisabled}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </CardWrapper>
  )
}
