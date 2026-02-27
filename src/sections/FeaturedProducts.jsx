import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { ScrollReveal } from '../components/shared/ScrollReveal'
import { GradientText } from '../components/shared/GradientText'
import { staggerContainer, fadeUp } from '../utils/animations'

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 89,
    originalPrice: 129,
    rating: 4.9,
    reviews: 2400,
    badge: 'Best Seller',
    badgeColor: 'bg-amber-500',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    glow: '99,102,241',
  },
  {
    id: 2,
    name: 'Minimalist Leather Watch',
    category: 'Accessories',
    price: 159,
    originalPrice: 199,
    rating: 4.8,
    reviews: 1800,
    badge: 'New',
    badgeColor: 'bg-emerald-500',
    gradient: 'from-amber-500/20 to-orange-500/20',
    glow: '245,158,11',
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 956,
    badge: '25% Off',
    badgeColor: 'bg-indigo-500',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    glow: '16,185,129',
  },
  {
    id: 4,
    name: 'Smart Fitness Tracker',
    category: 'Wearables',
    price: 49,
    originalPrice: 79,
    rating: 4.6,
    reviews: 3200,
    badge: 'Popular',
    badgeColor: 'bg-pink-500',
    gradient: 'from-pink-500/20 to-rose-500/20',
    glow: '236,72,153',
  },
]

function ProductCard({ product }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) / 12
    const y = (e.clientY - (rect.top + rect.height / 2)) / 12
    setMousePos({ x, y })
  }

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setMousePos({ x: 0, y: 0 }) }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale3d(1.02, 1.02, 1)`
          : 'translate3d(0,0,0) scale3d(1,1,1)',
        transition: 'transform 0.15s ease-out',
        boxShadow: isHovering
          ? `0 20px 60px rgba(${product.glow},0.2), 0 0 0 1px rgba(${product.glow},0.3)`
          : '0 0 0 1px rgba(255,255,255,0.06)',
      }}
      className='group relative rounded-2xl bg-neutral-900 overflow-hidden cursor-default'
    >
      {/* Top shine on hover */}
      <div
        className='absolute inset-x-0 top-0 h-px transition-all duration-300'
        style={{
          background: isHovering
            ? `linear-gradient(90deg, transparent, rgba(${product.glow},0.8), transparent)`
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }}
      />

      {/* Image Area */}
      <div className={`relative w-full h-52 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
        <FiShoppingCart size={52} className='text-white/20' />

        <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
          {product.badge}
        </span>

        <button className='absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white/60 hover:text-pink-400 transition-colors'>
          <FiHeart size={15} />
        </button>

        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <Button size='sm'>
            <FiShoppingCart size={15} />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className='p-5'>
        <p className='text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1'>
          {product.category}
        </p>
        <h3 className='text-white font-bold text-base mb-3 leading-snug'>
          {product.name}
        </h3>

        <div className='flex items-center gap-1.5 mb-4'>
          <div className='flex items-center gap-0.5'>
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                className='text-amber-400'
                style={{ fill: i < Math.floor(product.rating) ? '#fbbf24' : 'none' }}
              />
            ))}
          </div>
          <span className='text-neutral-400 text-xs'>
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <span className='text-white font-black text-xl'>${product.price}</span>
            <span className='text-neutral-500 text-sm line-through ml-2'>${product.originalPrice}</span>
          </div>
          <button
            style={{
              background: isHovering ? `rgba(${product.glow},0.8)` : '',
              transition: 'background 0.3s ease',
            }}
            className='w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white transition-colors'
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedProducts() {
  return (
    <section className='relative w-full py-24 bg-neutral-900 overflow-hidden'>
      <Container>
        <ScrollReveal>
          <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
            <div>
              <p className='text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3'>
                Handpicked For You
              </p>
              <h2 className='text-4xl md:text-5xl font-black text-white'>
                Featured <GradientText>Products</GradientText>
              </h2>
            </div>
            <Button variant='outline' size='md'>
              View All Products
            </Button>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}