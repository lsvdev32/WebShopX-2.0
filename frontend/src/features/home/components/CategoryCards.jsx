import { cn } from '@/lib/utils'
import { Link } from 'react-router'

/**
 * Card para la sección de categorías en la página de inicio.
 * @param {*} param0 - Props del componente
 * @returns JSX.Element - Componente de tarjeta de categoría
 */

export function CategoryCard ({ className, title, imageSrc, imageAlt, href = '#', ...props }) {
  return (
    <Link
      to={href}
      className={cn(
        'flex overflow-hidden rounded-sm border border-gray-200 bg-white transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      <div className='flex w-[120px] items-center justify-center bg-gray-50 p-2'>
        <img
          src={imageSrc || '/placeholder.svg?height=80&width=80'}
          alt={imageAlt || title}
          className='h-full w-full object-contain'
        />
      </div>
      <div className='flex flex-1 items-center p-4'>
        <h3 className='text-base font-medium text-gray-900'>{title}</h3>
      </div>
    </Link>
  )
}
