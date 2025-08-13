import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingBag,
  UserRound,
  Users
} from 'lucide-react'
import { Link } from 'react-router'
import { ModeToggle } from '../../common/ModleToggle'

export default function MobileMenu ({ userInfo, signoutHandler, query, setQuery, submitHandler }) {
  return (
    <div className='md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Menu className='h-6 w-6' />
          </Button>
        </SheetTrigger>
        <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
          <div className='flex flex-col h-full'>
            <form onSubmit={submitHandler} className='flex mb-4'>
              <Input
                type='text'
                placeholder='Buscar productos...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full'
              />
              <Button type='submit' variant='ghost' size='icon'>
                <Search className='h-4 w-4' />
              </Button>
            </form>
            <div className='space-y-4 flex-grow'>
              {userInfo
                ? (
                  <>
                    <SheetClose asChild>
                      <Link to='/user-profile' className='text-lg flex items-center'>
                        <UserRound className='w-5 h-5 mr-2' />
                        Mi perfil
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to='/user-order-history' className='text-lg flex items-center'>
                        <ShoppingBag className='w-5 h-5 mr-2' />
                        Mis ordenes
                      </Link>
                    </SheetClose>
                  </>
                  )
                : (
                  <SheetClose asChild>
                    <Link to='/signin' className='text-lg flex items-center'>
                      <UserRound className='w-5 h-5 mr-2' />
                      Iniciar sesión
                    </Link>
                  </SheetClose>
                  )}
              {userInfo && userInfo.isAdmin && (
                <>
                  <Separator />
                  <h2 className='font-semibold text-lg'>Opciones de Administrador</h2>
                  <SheetClose asChild>
                    <Link to='/admin/dashboard' className='text-lg flex items-center'>
                      <LayoutDashboard className='w-5 h-5 mr-2' />
                      Panel de información
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to='/admin/products' className='text-lg flex items-center'>
                      <Package className='w-5 h-5 mr-2' />
                      Administrar productos
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to='/admin/users' className='text-lg flex items-center'>
                      <Users className='w-5 h-5 mr-2' />
                      Administrar usuarios
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to='/admin/orders' className='text-lg flex items-center'>
                      <ClipboardList className='w-5 h-5 mr-2' />
                      Administrar órdenes
                    </Link>
                  </SheetClose>
                </>
              )}
            </div>
            <div className='mt-auto space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-lg'>Cambiar tema</span>
                <ModeToggle />
              </div>
            </div>
            <div className='mt-auto'>
              {userInfo && (
                <SheetClose asChild>
                  <Button onClick={signoutHandler} variant='ghost' className='w-full mt-4 flex items-center justify-center'>
                    <LogOut className='w-5 h-5' />
                    Cerrar sesión
                  </Button>
                </SheetClose>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
