import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration
} from 'react-router'
import Container from './components/common/Container'
import Footer from './components/layout/footer/Footer'
import Navbar from './components/layout/navbar/Navbar'
import { Toaster } from './components/ui/toaster'
import DashboardScreen from './features/admin/dashboard/screens/DashboardScreen'
import OrdersScreen from './features/admin/orders/screens/OrdersScreen'
import ProductListScreen from './features/admin/products/screens/ProductsScreen'
import UserListScreen from './features/admin/users/screens/UsersScreen'
import ForgotPasswordScreen from './features/auth/screens/ForgotPasswordScreen'
import ResetPasswordScreen from './features/auth/screens/ResetPasswordScreen'
import SigninScreen from './features/auth/screens/SigninScreen'
import SignupScreen from './features/auth/screens/SignupScreen'
import CartScreen from './features/cart/screen/ShoppingCartScreen'
import HomeScreen from './features/home/screens/HomeScreen'
import OrderScreen from './features/order-payment/screens/OrderPaymentScreen'
import PlaceOrderScreen from './features/place-order/screens/PlaceOrderScreen'
import ProductScreen from './features/product-details/screens/ProductDetailsScreen'
import SearchScreen from './features/search-products/screens/SearchProductsScreen'
import ShippingAddressScreen from './features/shippin-address/screens/ShippingInfoScreen'
import OrderHistoryScreen from './features/user/screens/OrderHistoryScreen'

const router = createBrowserRouter([
  {
    element: (
      <>
        <header id='header-main'>
          <Navbar />
        </header>
        <main>
          <ScrollRestoration getKey={(location) => location.pathname} />
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
        <Toaster />
      </>
    ),
    children: [
      { path: '/', element: <HomeScreen /> }, // Layout personalizado sin Container
      { path: '/signin', element: <Container><SigninScreen /></Container> },
      { path: '/signup', element: <Container><SignupScreen /></Container> },
      { path: '/cart', element: <Container><CartScreen /></Container> },
      { path: '/product/:link', element: <Container><ProductScreen /></Container> },
      { path: '/shipping', element: <Container><ShippingAddressScreen /></Container> },
      { path: '/place-order', element: <Container><PlaceOrderScreen /></Container> },
      { path: '/order/:id', element: <Container><OrderScreen /></Container> },
      { path: '/forgot-password', element: <Container><ForgotPasswordScreen /></Container> },
      { path: '/reset-password/:token', element: <Container><ResetPasswordScreen /></Container> },
      { path: '/admin/users', element: <Container><UserListScreen /></Container> },
      { path: '/admin/products', element: <Container><ProductListScreen /></Container> },
      { path: '/admin/orders', element: <Container><OrdersScreen /></Container> },
      { path: '/search', element: <Container><SearchScreen /></Container> },
      { path: '/user-order-history', element: <Container><OrderHistoryScreen /></Container> },
      { path: '/admin/dashboard', element: <Container><DashboardScreen /></Container> }
    ]
  }
])

export default function App () {
  return <RouterProvider router={router} />
}
