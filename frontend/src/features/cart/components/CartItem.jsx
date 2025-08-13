import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { formatPrice } from '@/utils/pricing'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router'

/**
 * Componente que representa un item del carrito de compras.
 * Muestra la información del producto, permite actualizar la cantidad y eliminar el item del carrito.
 * @param {*} param0 - Props que incluyen el item del carrito, funciones para actualizar y eliminar el item, y un indicador si es el último item.
 * @returns {JSX.Element} Componente de item del carrito de compras.
 */

export default function CartItem ({ item, updateCartHandler, removeItemHandler, isLast }) {
  return (
    <div>
      {/* Vista de Computadora */}
      <div
        // Crea un borde en la parte inferior si no es el último elemento, sirve para dividir visualmente los productos
        className={`hidden md:grid grid-cols-12 gap-4 items-center ${!isLast ? 'pb-6 border-b border-gray-100' : ''}`}
      >
        <div className='col-span-6 flex items-center space-x-4'>
          <Link to={`/product/${item.link}`}>
            <img
              src={item.images?.[0] || '/placeholder.svg'}
              alt={item.name}
              className='w-16 h-16 object-contain rounded-lg hover:scale-105 transition-transform cursor-pointer'
              loading='lazy'
            />
          </Link>
          <div className='flex-1 min-w-0'>
            <Link
              to={`/product/${item.link}`}
              className='block font-semibold text-gray-900 hover:text-gray-700 transition-colors'
            >
              {item.name}
            </Link>
            {item.variant && <p className='text-sm text-gray-500 mt-1'>{item.variant}</p>}
          </div>
        </div>
        <div className='col-span-3 flex justify-center'>
          <Select
            value={item.quantity.toString()}
            onValueChange={(value) => updateCartHandler(item, Number.parseInt(value))}
          >
            <SelectTrigger className='w-20 h-10'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: Math.min(item.stock, 10) }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-3 flex items-center justify-end space-x-4'>
          <span className='font-semibold text-gray-900'>{formatPrice(item.price)}</span>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => removeItemHandler(item)}
            className='text-gray-400 hover:text-gray-600 h-8 w-8'
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Vista de teléfono */}
      <div
        className={`md:hidden bg-white ${!isLast ? 'border-b border-gray-200 pb-4' : ''}`}
      >
        <div className='flex items-start space-x-4 relative'>
          <Link to={`/product/${item.link}`}>
            <img
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              className='w-16 h-16 object-contain rounded-lg hover:scale-105 transition-transform cursor-pointer flex-shrink-0'
            />
          </Link>
          <div className='flex-1 min-w-0'>
            <div className='flex justify-between items-start'>
              <div className='flex-1 min-w-0 pr-2'>
                <Link
                  to={`/product/${item.link}`}
                  className='block font-semibold text-gray-900 hover:text-gray-700 transition-colors text-sm leading-tight'
                >
                  {item.name}
                </Link>
                {item.variant && <p className='text-sm text-gray-500 mt-1'>{item.variant}</p>}
                <p className='text-lg font-semibold text-gray-900 mt-2'>{formatPrice(item.price)}</p>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => removeItemHandler(item)}
                className='text-gray-400 hover:text-gray-600 h-8 w-8 flex-shrink-0'
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
            <div className='flex justify-end mt-3'>
              <Select
                value={item.quantity.toString()}
                onValueChange={(value) => updateCartHandler(item, Number.parseInt(value))}
              >
                <SelectTrigger className='w-20 h-10'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.min(item.stock, 10) }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
