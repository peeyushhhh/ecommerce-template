import { Hero } from '../sections/Hero'
import { BrandStrip } from '../sections/BrandStrip'
import { Features } from '../sections/Features'
import { FeaturedProducts } from '../sections/FeaturedProducts'
import { StatsSection } from '../sections/StatsSection'
import { Testimonials } from '../sections/Testimonials'
import { Newsletter } from '../sections/Newsletter'
import { Footer } from '../sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <Features />
      <FeaturedProducts />
      <StatsSection />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  )
}