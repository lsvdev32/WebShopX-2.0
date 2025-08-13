import CheckoutSteps from '@/components/common/CheckoutSteps'
import Loader from '@/components/common/Loader'
import { Helmet } from 'react-helmet-async'
import ShippingSummary from '../components/ShippingSummary'
import AnimatedSection from '@/components/common/AnimatedSection'
import { MessageBox } from '@/components/common/MessageBox'
import OrderSummary from '@/components/common/OrderSummary'
import OrderItems from '../../../components/common/OrderItems'
import PlaceOrderSkeleton from '../components/PlaceOrderSkeleton'
import usePlaceOrder from '../hooks/usePlaceOrder'

/**
 * Pantalla para generar una factura de pedido.
 * Muestra los detalles del envío, los artículos del pedido y el resumen del pedido.
 * Permite al usuario generar una factura para el pedido actual.
 * @returns {JSX.Element} Componente de pantalla de generación de factura.
 */
export default function PlaceOrderScreen () {
  const {
    loading,
    error,
    cart,
    userInfo,
    subtotal,
    shippingCost,
    savings,
    total,
    handleCreateOrder
  } = usePlaceOrder()

  return (
    <AnimatedSection>
      <Helmet>
        <title>Generar factura | WebShopX</title>
      </Helmet>
      {loading || !userInfo || cart.cartItems.length === 0 || !cart.shippingAddress.address || !cart.paymentMethod
        ? (
          <PlaceOrderSkeleton />
          )
        : error
          ? (
            <MessageBox variant='danger'>{error}</MessageBox>
            )
          : (
            <>
              <header>
                <CheckoutSteps steps={['Iniciar sesión', 'Envío y pagos', 'Generar factura']} currentStep={3} />
              </header>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <section className='lg:col-span-2 space-y-6'>
                  <article>
                    {/* Utilizamos este componente para mostrar la informacion de envio y metodo de pago */}
                    <ShippingSummary
                      shippingAddress={cart.shippingAddress}
                      paymentMethod={cart.paymentMethod}
                    />
                  </article>
                  <article>
                    {/* Con este componente mostramos los productos que deseamos mostrar */}
                    <OrderItems
                      textTitle='Productos que deseas comprar...'
                      editCart
                      orderItems={cart.cartItems}
                    />
                  </article>
                </section>
                <aside className='md:col-span-1'>
                  {/* Mostramos el resumen del pedido */}
                  <OrderSummary
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    savings={savings}
                    total={total}
                    buttonText='Generar factura'
                    onClick={handleCreateOrder}
                    isDisabled={cart.cartItems.length === 0}
                  />
                  {loading && <Loader />}
                </aside>
              </div>
            </>
            )}
    </AnimatedSection>
  )
}
