import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { SlidersHorizontal } from 'lucide-react'
import FilterSidebar from './FilterSidebar'

/**
 * Componente para o Drawer de filtros em dispositivos móveis
 * @param {*} param0 - Objeto com as propriedades
 * @returns JSX.Element
 */
export default function MobileFilterDrawer ({ categories, currentCategory, currentPrice, currentRating, getFilterUrl }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className='flex items-center gap-2' aria-label='Abrir filtros'>
          <SlidersHorizontal className='h-4 w-4' />
          Filtrar
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-full sm:w-[340px] p-0'>
        <SheetHeader className='p-4 border-b'>
          <SheetTitle>Filtrar por</SheetTitle>
        </SheetHeader>
        <ScrollArea className='h-[calc(100vh-4rem)]'>
          <div className='p-4'>
            <FilterSidebar
              categories={categories}
              currentCategory={currentCategory}
              currentPrice={currentPrice}
              currentRating={currentRating}
              getFilterUrl={getFilterUrl}
              isMobile
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
