/**
 * Componente para mostrar publicidad o promociones destacadas.
 */

import { cn } from '@/lib/utils'
import CardWrapper from './CardWrapper'

export function PromoBanner ({
  className,
  discount,
  title,
  subtitle,
  buttonText,
  buttonHref,
  leftImageSrc,
  rightImageSrc,
  ...props
}) {
  return (
    <CardWrapper
      className={cn('relative flex overflow-hidden bg-[#1a2238] px-4 py-8 text-white md:px-10', className)}
      {...props}
    >
      {leftImageSrc && (
        <div className='absolute bottom-0 left-0 h-full w-1/4 md:w-1/5'>
          <img
            src={leftImageSrc || '/placeholder.svg'}
            alt=''
            className='h-full w-full object-contain object-left-bottom'
          />
        </div>
      )}

      <div className='z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center'>
        <div className='mb-2 text-4xl font-bold md:text-5xl lg:text-6xl'>-{discount}</div>
        <h2 className='mb-2 text-xl font-semibold md:text-2xl'>{title}</h2>
        <p className='mb-6 max-w-md text-sm text-white/80'>{subtitle}</p>
        {/* <Button
          href={buttonHref}
          className='inline-flex h-10 items-center justify-center rounded-sm border border-white bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#1a2238] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a2238]'
        >
          {buttonText}
        </Button> */}
      </div>

      {rightImageSrc && (
        <div className='absolute bottom-0 right-0 h-full w-1/4 md:w-1/5'>
          <img
            src={rightImageSrc || '/placeholder.svg'}
            alt=''
            className='h-full w-full object-contain object-right-bottom'
          />
        </div>
      )}
    </CardWrapper>
  )
}
