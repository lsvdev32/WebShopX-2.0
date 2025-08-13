import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton de carga para la vista de detalles del producto.
 * Muestra un diseño de carga con elementos de esqueleto para simular la estructura de la página.
 * Incluye una galería de imágenes, información del producto, botones de acción y pestañas de descripción.
 * @returns {JSX.Element} Componente de esqueleto de vista de producto.
 */
export default function ProductViewSkeleton () {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {/* Galeria de imagenes */}
      <div className='lg:col-span-2 flex flex-col md:flex-row gap-3'>
        {/* Imagen principal */}
        <div className='w-full order-1 md:order-2 md:flex-1'>
          <Skeleton className='w-full h-80 md:h-96 rounded-lg' />
        </div>
        {/* Thumbnails */}
        <div className='flex flex-row md:flex-col gap-2 overflow-x-auto order-2 md:order-1 mt-4 md:mt-0'>
          {[1, 2, 3].map((_, idx) => (
            <Skeleton key={idx} className='min-w-[80px] w-20 h-20 rounded-lg' />
          ))}
        </div>
      </div>
      {/* Informacion del producto */}
      <div className='flex flex-col gap-3'>
        {/* Titulo */}
        <Skeleton className='h-10 w-full rounded' />
        {/* Calificacion */}
        <Skeleton className='h-5 w-1/3 rounded' />
        {/* Precio */}
        <Skeleton className='h-12 w-3/4 rounded' />
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-4 w-full rounded' />
          <Skeleton className='h-4 w-1/3 rounded' />
        </div>
        {/* Descripcion */}
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-4 w-1/2 rounded my-2' />
          <Skeleton className='h-4 w-5/6 rounded' />
          <Skeleton className='h-4 w-5/6 rounded' />
          <Skeleton className='h-4 w-1/3 rounded' />
        </div>
        {/* Boton */}
        <div className='flex gap-2 mt-3'>
          <Skeleton className='h-10 w-full rounded' />
        </div>
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-4 w-2/3 rounded' />
          <Skeleton className='h-4 w-2/3 rounded' />
          <Skeleton className='h-4 w-2/3 rounded' />
        </div>
      </div>
      {/* Descripcion o reseñas */}
      <div className='col-span-2'>
        <div className='border-b w-full flex'>
          <Skeleton className='py-2 mr-2 font-medium text-sm w-1/6 rounded' />
          <Skeleton className='py-2 font-medium text-sm w-1/6 rounded' />
        </div>
        {/* Descripcion */}
        <div className='py-4'>
          <Skeleton className='h-4 w-1/3 rounded mb-2' />
          <Skeleton className='h-4 w-full rounded mb-2' />
          <Skeleton className='h-4 w-full rounded mb-2' />
          <Skeleton className='h-4 w-full rounded mb-2' />
          <Skeleton className='h-4 w-full rounded mb-2' />
          <Skeleton className='h-4 w-1/3 rounded mb-2' />
          <Skeleton className='h-4 w-1/3 rounded mb-2' />
        </div>
      </div>
    </div>
  )
}
