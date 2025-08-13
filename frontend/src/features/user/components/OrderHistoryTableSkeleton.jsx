import CardWrapper from '@/components/common/CardWrapper'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

/**
 * Componente para mostrar un esqueleto de carga del historial de órdenes del usuario
 * @returns JSX.Element - Componente que muestra un esqueleto de carga con una tabla
 * que simula el historial de órdenes
 */
export default function OrderHistoryTableSkeleton () {
  return (
    <CardWrapper className='p-6 animate-pulse'>
      <div className='h-6 w-1/3 bg-gray-200 rounded mb-6' />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='h-10 bg-gray-200' />
            <TableHead className='h-10 bg-gray-200' />
            <TableHead className='h-10 bg-gray-200' />
            <TableHead className='h-10 bg-gray-200' />
            <TableHead className='h-10 bg-gray-200' />
            <TableHead className='h-10 bg-gray-200' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell className='h-10 bg-gray-200' />
              <TableCell className='h-10 bg-gray-200' />
              <TableCell className='h-10 bg-gray-200' />
              <TableCell className='h-10 bg-gray-200' />
              <TableCell className='h-10 bg-gray-200' />
              <TableCell className='h-10 bg-gray-200' />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardWrapper>
  )
}
