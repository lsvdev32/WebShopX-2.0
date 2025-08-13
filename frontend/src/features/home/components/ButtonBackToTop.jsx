import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BackToTop () {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      {showBackToTop && (
        <Button
          size='sm'
          className='fixed bottom-6 right-6 p-3 rounded-full shadow-xl z-50 hover:cursor-pointer transition-all duration-300 bg-white text-[#1a2238] hover:bg-gray-100 hover:shadow-2xl'
          onClick={scrollToTop}
        >
          <ArrowUp size={24} />
        </Button>
      )}
    </>
  )
}
