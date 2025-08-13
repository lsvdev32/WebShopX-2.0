/**
 * Cards para mostrar promociones o ofertas especiales.
 */

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import CardWrapper from './CardWrapper'

export function PromoCard ({
  className,
  tagline,
  title,
  ctaText = 'Ver ofertas',
  imageSrc,
  imageAlt = 'Promotional image',
  imagePosition = 'right',
  ...props
}) {
  return (
    <CardWrapper
      className={cn(
        'flex overflow-hidden bg-white shadow-sm h-[300px]',
        imagePosition === 'left' ? 'flex-row-reverse' : 'flex-row',
        className
      )}
      {...props}
    >
      <div className='flex flex-1 flex-col justify-between p-6'>
        <div className='space-y-2'>
          <p className='text-sm font-medium uppercase tracking-wider text-gray-500'>{tagline}</p>
          <h3 className='text-2xl font-bold text-gray-800'>{title}</h3>
        </div>
        <Button className='bg-[#1a2238] text-white hover:bg-[#2a3248]'>
          {ctaText}
        </Button>
      </div>
      {imageSrc && (
        <div className='w-1/2'>
          <img src={imageSrc} alt={imageAlt} className='h-full w-full object-cover' />
        </div>
      )}
    </CardWrapper>
  )
}
