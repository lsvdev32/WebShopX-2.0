import Loader from '@/components/common/Loader'
import { PayPalButtons } from '@paypal/react-paypal-js'

/**
 * Componente que maneja el pago con PayPal.
 * Muestra un botón de PayPal y maneja el proceso de creación y aprobación del pedido
 * @param {*} param0 - Props que incluyen estado de pago, funciones de PayPal y estado de carga
 * @param {boolean} isPending - Indica si el pago está pendiente
 * @returns JSX Element que representa el botón de PayPal y maneja el proceso de pago
 */
export default function PayPalPayment ({ isPending, loadingPay, createOrder, onApprove, onError }) {
  if (isPending || loadingPay) {
    return <Loader />
  }

  return (
    <div className='mt-4'>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  )
}
