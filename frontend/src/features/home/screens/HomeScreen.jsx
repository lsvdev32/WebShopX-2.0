import { InfiniteCarouselOfBrands } from '@/components/common/InfiniteCarouselOfBrands'
import { ShippingInfo } from '@/components/common/ShippingInfo'
import SliderImg from '@/components/common/SliderImg'
import { Helmet } from 'react-helmet-async'
import BestSellingProductsSection from '../components/BestSellingProductsSection'
import CategoryCarouselSection from '../components/CategoryCarouselSection'
import FashionPromoSection from '../components/FashionPromoSection'
import ProductsSection from '../components/ProductsSection'
import PromoSection from '../components/PromoSection'
import RecentProductsSection from '../components/RecentProductsSection'
import useHomeData from '../hooks/useHomeData'
import BackToTop from '@/features/home/components/ButtonBackToTop'

/**
 * Componente principal de la pantalla de inicio
 * Utiliza el hook useHomeData para obtener los datos necesarios y renderizar las secciones
 * @returns {JSX.Element} Componente principal de la pantalla de inicio
 */

export default function HomeScreen () {
  const { loading, error, topSellingProducts, randomProducts, recentProducts, promos, categories } = useHomeData()

  return (
    <>
      <Helmet>
        <title>Inicio | WebShopX</title>
      </Helmet>
      <SliderImg />
      <BackToTop />
      <div className='relative'>
        <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#ebebeb] to-transparent dark:from-[#202A39]' />
      </div>
      <ProductsSection products={randomProducts} loading={loading} error={error} />
      <InfiniteCarouselOfBrands />
      <FashionPromoSection promos={promos} loading={loading} error={error} />
      <RecentProductsSection products={recentProducts} loading={loading} error={error} />
      <BestSellingProductsSection products={topSellingProducts} loading={loading} error={error} />
      <PromoSection promos={promos} loading={loading} error={error} />
      <ShippingInfo />
      <CategoryCarouselSection categories={categories} loading={loading} error={error} />
    </>
  )
}
