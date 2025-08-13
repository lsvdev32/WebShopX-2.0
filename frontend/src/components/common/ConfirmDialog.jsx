/**
 * Este componente ConfirmDialog muestra un diálogo de confirmación.
 * Permite al usuario confirmar o cancelar una acción.
 * Lo utilizamos en en el componente ActionsMenu para confirmar acciones como eliminar un usuario o producto.
 * También se utiliza en el componente OrdersScreen para confirmar la eliminación de una orden.
 */

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'

export default function ConfirmDialog ({
  open,
  onOpenChange,
  triggerText,
  title,
  description,
  confirmText,
  onConfirm,
  icon: Icon
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className='flex items-center gap-2'>
          {Icon && <Icon className='w-5 h-5' />}
          {title}
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
