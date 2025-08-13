import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import RadioGroup from '@/components/ui/radio-group'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { RadioGroupItem } from '@radix-ui/react-radio-group'
import { ArrowUpDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { sortOptions } from '../const/sortOptions'

/**
 * Componente para ordenamiento de produtos em dispositivos móveis
 * @param {*} param0 - Objeto con las propiedades
 * @returns JSX.Element
 */
export default function MobileSortDrawer ({ currentOrder, getFilterUrl }) {
  // Estado para controla la visibilidad del Drawer
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  /**
   * Maneja el cambio de ordenamiento
   * @param {*} value - Valor seleccionado
   */
  const handleSort = (value) => {
    navigate(getFilterUrl({ order: value }))
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className='flex items-center gap-2' aria-label='Abrir opciones de ordenamiento'>
          <ArrowUpDown className='h-4 w-4' />
          Ordenar
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-full sm:w-[340px]'>
        <SheetHeader className='mb-4'>
          <SheetTitle>Ordenar por</SheetTitle>
        </SheetHeader>
        <RadioGroup value={currentOrder} onValueChange={handleSort} aria-label='Opciones de ordenamiento'>
          {sortOptions.map((option) => (
            <div key={option.value} className='flex items-center space-x-2 mb-4'>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </SheetContent>
    </Sheet>
  )
}
