import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { GradientText } from '../components/shared/GradientText'
import { fadeUp, staggerContainer } from '../utils/animations'
import { FiArrowRight, FiShoppingBag, FiStar, FiShield, FiTruck } from 'react-icons/fi'

const trustBadges = [
  { icon: FiTruck, label: 'Free Shipping' },
  { icon: FiShield, label: 'Secure Checkout' },
  { icon: FiStar, label: '4.9 Rated' },
]

function InteractiveGrid() {
  const containerRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-600, 600], [-15, 15]), springConfig)

  function handleMouseMove(e) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='absolute inset-0 -z-10 overflow-hidden'
      style={{ perspective: '800px' }}
    >
      {/* Dark base */}
      <div className='absolute inset-0 bg-neutral-950' />

      {/* Indigo glow top left */}
      <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full' style={{ filter: 'blur(80px)' }} />

      {/* Violet glow bottom right */}
      <div className='absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600/15 rounded-full' style={{ filter: 'blur(80px)' }} />

      {/* 3D Interactive Grid */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className='absolute inset-0'
      >
        {/* Horizontal lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className='absolute left-0 right-0 h-px'
            style={{
              top: `${(i / 19) * 100}%`,
              background: `rgba(99, 102, 241, ${0.03 + (i % 3) * 0.01})`,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${(i % 4) * 8}px)`,
            }}
          />
        ))}

        {/* Vertical lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className='absolute top-0 bottom-0 w-px'
            style={{
              left: `${(i / 19) * 100}%`,
              background: `rgba(99, 102, 241, ${0.03 + (i % 3) * 0.01})`,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${(i % 4) * 8}px)`,
            }}
          />
        ))}

        {/* Glowing intersection dots */}
        {[...Array(6)].map((_, row) =>
          [...Array(6)].map((_, col) => (
            <motion.div
              key={`dot-${row}-${col}`}
              className='absolute w-1 h-1 rounded-full bg-indigo-500/30'
              style={{
                left: `${15 + col * 14}%`,
                top: `${15 + row * 14}%`,
                transform: `translateZ(${(row + col) % 4 * 12}px)`,
              }}
            />
          ))
        )}

        {/* Center glow plane */}
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full'
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
            transform: 'translateZ(20px)',
          }}
        />
      </motion.div>
    </div>
  )
}

export function Hero() {
  return (
    <section className='relative min-h-screen flex items-center overflow-hidden'>

      <InteractiveGrid />

      <Container>
        <div className='flex flex-col lg:flex-row items-center gap-16 py-32 lg:py-0'>

          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial='hidden'
            animate='visible'
            className='flex-1 text-center lg:text-left'
          >
            {/* Label */}
            <motion.div
              variants={fadeUp}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6'
            >
              <span className='w-2 h-2 bg-indigo-400 rounded-full animate-pulse' />
              New Collection 2026
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className='text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight text-white mb-6'
            >
              Shop Smarter,{' '}
              <br />
              <GradientText>Live Better</GradientText>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className='text-lg text-neutral-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8'
            >
              Discover premium products curated for modern living.
              Free shipping on orders over $50, with hassle-free returns
              and 24/7 customer support.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12'
            >
              <Button size='lg' className='w-full sm:w-auto'>
                <FiShoppingBag size={20} />
                Shop Now
              </Button>
              <Button size='lg' variant='secondary' className='w-full sm:w-auto'>
                View Lookbook
                <FiArrowRight size={20} />
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              className='flex flex-wrap items-center justify-center lg:justify-start gap-6'
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className='flex items-center gap-2 text-neutral-300 text-sm'>
                  <Icon size={16} className='text-indigo-400' />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
<motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  className='flex-1 relative flex items-center justify-center'
>
  <div className='relative w-full max-w-sm'>

    {/* Main card */}
    <div
      className='rounded-3xl border border-white/10 bg-black p-6 shadow-2xl'
      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(99,102,241,0.15)' }}
    >
      {/* Product image */}
      <div className='w-full h-56 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center mb-5 relative overflow-hidden'>
        <FiShoppingBag size={64} className='text-indigo-400 opacity-40' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
        <div className='absolute bottom-3 left-3 right-3'>
          <div className='flex gap-2'>
            {['bg-indigo-500', 'bg-violet-500', 'bg-pink-500'].map((c, i) => (
              <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-black`} />
            ))}
            <span className='text-white/60 text-xs self-center'>+12 colors</span>
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className='flex items-start justify-between mb-3'>
        <div>
          <p className='text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1'>Featured</p>
          <h3 className='text-white font-black text-lg leading-tight'>Premium Collection</h3>
          <p className='text-neutral-500 text-xs mt-0.5'>Limited Edition 2026</p>
        </div>
        <div className='text-right'>
          <p className='text-neutral-500 text-sm line-through'>$129</p>
          <p className='text-white font-black text-2xl'>$89</p>
        </div>
      </div>

      {/* Rating */}
      <div className='flex items-center gap-1 mb-4'>
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} size={12} className='text-amber-400' style={{ fill: '#fbbf24' }} />
        ))}
        <span className='text-neutral-400 text-xs ml-1'>(2.4k reviews)</span>
      </div>

      {/* Add to cart */}
      <button className='w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2'>
        <FiShoppingBag size={16} />
        Add to Cart
      </button>

      {/* Mini product strip */}
      <div className='flex gap-2 mt-4'>
        {[
          { gradient: 'from-indigo-500/30 to-violet-500/30', label: '$89' },
          { gradient: 'from-amber-500/30 to-orange-500/30', label: '$159' },
          { gradient: 'from-pink-500/30 to-rose-500/30', label: '$49' },
        ].map((p, i) => (
          <div key={i} className={`flex-1 h-16 rounded-xl bg-gradient-to-br ${p.gradient} border border-white/10 flex items-end p-2`}>
            <span className='text-white text-xs font-bold'>{p.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Floating badge */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className='absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30'
    >
      31% OFF
    </motion.div>

    {/* Floating order notification */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className='absolute -left-16 top-1/3 bg-black border border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3'
      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.4)' }}
    >
      <div className='w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0'>
        ✓
      </div>
      <div>
        <p className='text-white text-xs font-semibold'>Order Shipped!</p>
        <p className='text-neutral-500 text-xs'>2 mins ago</p>
      </div>
    </motion.div>

  </div>
</motion.div>

        </div>
      </Container>

    </section>
  )
}