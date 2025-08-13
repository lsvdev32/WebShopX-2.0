import AnimatedSection from '@/components/common/AnimatedSection'
import CheckoutSteps from '@/components/common/CheckoutSteps'
import OrderSummary from '@/components/common/OrderSummary'
import { Helmet } from 'react-helmet-async'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import ShippingForm from '../components/ShippingForm'
import ShippingSkeleton from '../components/ShippingSkeleton'
import useShippingInfo from '../hooks/useShippingInfo'

/**
 * Componente para la pantalla de información de envío
 * @returns {JSX.Element}
 */
export default function ShippingInfoScreen () {
  const {
    loading,
    error,
    control,
    errors,
    handleSubmit,
    subtotal,
    shippingCost,
    savings,
    total,
    cartItems,
    userInfo
  } = useShippingInfo()

  return (
    <AnimatedSection>
      <Helmet>
        <title>Información de envío | WebShopX</title>
      </Helmet>
      {loading || !userInfo
        ? (
          <ShippingSkeleton />
          )
        : error
          ? (
            <div className='text-red-500 text-center'>{error}</div>
            )
          : (
            <>
              <header>
                <CheckoutSteps steps={['Iniciar sesión', 'Envío y pagos', 'Generar factura']} currentStep={2} />
              </header>
              <div className='flex flex-col md:flex-row gap-8'>
                <article className='w-full md:w-2/3'>
                  <ShippingForm control={control} errors={errors} />
                </article>
                <aside className='w-full md:w-1/3'>
                  <OrderSummary
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    savings={savings}
                    total={total}
                    buttonText='Vista previa de factura'
                    onClick={handleSubmit}
                    isDisabled={cartItems.length === 0}
                  />
                  <PaymentMethodSelector control={control} errors={errors} />
                </aside>
              </div>
            </>
            )}
    </AnimatedSection>
  )
}
