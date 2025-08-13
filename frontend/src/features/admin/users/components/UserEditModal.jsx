/**
 * Componente de ventana modal para editar usuarios.
 * Utiliza un formulario para ingresar los detalles del usuario.
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import UserForm from '@/features/admin/users/components/UserForm'

export default function UserEditModal ({ open, selectedUser, onOpenChange, onSuccess }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[575px]'>
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
          <DialogDescription>Ingresa los nuevos datos del usuario</DialogDescription>
          <Separator />
        </DialogHeader>
        <UserForm
          user={selectedUser}
          setOpenModal={onOpenChange}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
