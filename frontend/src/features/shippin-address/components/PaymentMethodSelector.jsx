import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import { Controller } from 'react-hook-form'

/**
 * Componente para seleccionar el método de pago
 * @param {*} param0 - Contiene el control del formulario y los errores
 * @returns JSX.Element
 */
export default function PaymentMethodSelector ({ control, errors }) {
  return (
    <CardWrapper className='p-6 mb-5 bg-[#1a2238] text-gray-200 mt-3'>
      <CardContent>
        <Controller
          name='paymentMethod'
          control={control}
          render={({ field }) => (
            <div className='space-y-2'>
              <div className='flex'>
                <h3 className='font-medium mr-2'>Método de pago</h3>
                <CreditCard className='w-5 h-5' />
              </div>
              <div className='flex items-center space-x-3 p-3 border rounded-md'>
                <input
                  type='radio'
                  id='paypal'
                  value='PayPal'
                  checked={field.value === 'PayPal'}
                  onChange={(e) => field.onChange(e.target.value)}
                  className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                />
                <label htmlFor='paypal' className='flex items-center'>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/174/174861.png'
                    alt='PayPal'
                    className='h-5 w-5 mr-2'
                  />
                  <p>PayPal</p>
                </label>
              </div>
              {errors.paymentMethod && <p className='text-xs text-red-500'>{errors.paymentMethod.message}</p>}
            </div>
          )}
        />
        <div className='mt-3'>
          <p className='text-xs text-gray-400 text-center'>Realiza tus compras con <span className='text-blue-500'>PayPal</span> la forma más rapida y sencilla de realizar tus pagos en linea</p>
        </div>
      </CardContent>
    </CardWrapper>
  )
}
