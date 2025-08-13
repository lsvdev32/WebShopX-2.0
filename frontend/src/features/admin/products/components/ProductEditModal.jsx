/**
 * Componente de ventana modal para editar o crear productos.
 * Utiliza un formulario para ingresar los detalles del producto.
 */

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import ProductForm from '@/features/admin/products/components/ProductForm'

export default function ProductEditModal ({ open, selectedProduct, onOpenChange, onSuccess, onCreate }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onCreate} aria-label='Crear nuevo producto'>Crear producto</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[625px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {selectedProduct ? 'Editar producto' : 'Crear producto'}
          </DialogTitle>
          <DialogDescription>
            {selectedProduct
              ? 'Modifica los detalles del producto'
              : 'Ingresa los detalles del nuevo producto'}
          </DialogDescription>
          <Separator />
        </DialogHeader>
        {/* Cargamos el formulario ya sea para crear o para actualizar un producto */}
        <ProductForm
          product={selectedProduct}
          setOpenModal={onOpenChange}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
