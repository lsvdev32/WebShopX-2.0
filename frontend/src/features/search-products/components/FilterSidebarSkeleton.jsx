import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'

/**
 * Componente skeleton para la barra lateral de filtros
 * @param {*} param0 - Objeto con la propiedad isMobile
 * @param {boolean} param0.isMobile - Indica si el componente se renderiza en móvil
 * @returns {JSX.Element} - Componente de esqueleto para la barra lateral de filtros
 */
export default function FilterSidebarSkeleton ({ isMobile = false }) {
  const content = (
    <div className='space-y-6 animate-pulse'>
      <div>
        <div className='h-6 w-1/3 bg-gray-200 rounded mb-3' />
        <div className='space-y-2'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-4 w-full bg-gray-200 rounded' />
          ))}
        </div>
      </div>
      <div className='h-px bg-gray-200' />
      <div>
        <div className='h-6 w-1/3 bg-gray-200 rounded mb-3' />
        <div className='space-y-2'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='h-4 w-full bg-gray-200 rounded' />
          ))}
        </div>
      </div>
      <div className='h-px bg-gray-200' />
      <div>
        <div className='h-6 w-1/3 bg-gray-200 rounded mb-3' />
        <div className='space-y-2'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='h-4 w-full bg-gray-200 rounded' />
          ))}
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return content
  }

  return (
    <CardWrapper className='sticky top-4'>
      <CardContent className='p-4'>{content}</CardContent>
    </CardWrapper>
  )
}
