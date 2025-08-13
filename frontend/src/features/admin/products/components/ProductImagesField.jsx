/**
 * Campo para manejar las imágenes de un producto en el formulario de edición.
 * Permite subir, eliminar y marcar imágenes como principales.
 */

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Star, X } from 'lucide-react'

export default function ProductImagesField ({ field, previewImages, handleUploadImages, handleRemoveImage, handleSetPrimaryImage, uploading }) {
  return (
    <FormItem className='col-span-2'>
      <FormLabel className='text-gray-600 font-medium'>Imágenes del producto</FormLabel>
      <FormControl>
        <div className='w-full border-2 border-dashed bg-gray-50 border-gray-400 rounded-lg p-4 flex flex-wrap gap-2'>
          {previewImages.map((img, index) => (
            <div key={index} className='relative w-24 h-24 border rounded overflow-hidden group border-gray-400 p-1'>
              <img src={img} alt={`Vista previa de imagen ${index + 1}`} className='w-full h-full object-contain' loading='lazy' />
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='absolute top-0 right-0 bg-red-600 text-white rounded-bl p-1 text-xs opacity-90 group-hover:opacity-100'
                aria-label='Eliminar imagen'
              >
                <X className='w-3 h-3' />
              </button>
              <button
                type='button'
                onClick={() => handleSetPrimaryImage(index)}
                className='absolute bottom-0 right-0 bg-[#1a2238] text-white rounded-tl p-1 text-xs opacity-90 group-hover:opacity-100'
                aria-label='Marcar como imagen principal'
              >
                <Star className='w-3 h-3 text-yellow-400 fill-current' />
              </button>
            </div>
          ))}
          <div className='flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded cursor-pointer relative'>
            <input
              type='file'
              accept='.jpg,.jpeg,.png,.webp'
              multiple
              className='absolute w-24 h-24 opacity-0 cursor-pointer'
              onChange={handleUploadImages}
              disabled={uploading}
              aria-label='Subir imágenes'
            />
            <span className='text-gray-400 text-xs text-center'>{uploading ? 'Cargando...' : 'Subir'}</span>
          </div>
        </div>
      </FormControl>
      {previewImages.length < 3 && (
        <p className='text-gray-600 text-xs mt-1'>Por favor sube {3 - previewImages.length} imagen(es) más</p>
      )}
      <FormMessage />
    </FormItem>
  )
}
