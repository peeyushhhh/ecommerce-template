import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/shared/ScrollReveal'
import { GradientText } from '../components/shared/GradientText'
import { staggerContainer, fadeUp } from '../utils/animations'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    avatar: 'SJ',
    gradient: 'from-indigo-500 to-violet-500',
    glow: '99,102,241',
    rating: 5,
    text: 'Absolutely love the quality of everything I have ordered. Shipping was faster than expected and the packaging was premium. Will definitely be ordering again.',
    product: 'Premium Headphones',
  },
  {
    name: 'Marcus Chen',
    role: 'Verified Buyer',
    avatar: 'MC',
    gradient: 'from-emerald-500 to-teal-500',
    glow: '16,185,129',
    rating: 5,
    text: 'The customer support team went above and beyond when I had an issue with my order. Resolved within an hour. This is how online shopping should feel.',
    product: 'Leather Watch',
  },
  {
    name: 'Priya Patel',
    role: 'Verified Buyer',
    avatar: 'PP',
    gradient: 'from-pink-500 to-rose-500',
    glow: '236,72,153',
    rating: 5,
    text: 'Third time ordering and the experience keeps getting better. The product quality is consistently excellent and prices are unbeatable for what you get.',
    product: 'Fitness Tracker',
  },
  {
    name: 'James Miller',
    role: 'Verified Buyer',
    avatar: 'JM',
    gradient: 'from-amber-500 to-orange-500',
    glow: '245,158,11',
    rating: 4,
    text: 'Really impressed with how well the site works on mobile. Easy to browse, easy to checkout, and the order tracking is super detailed. Great experience overall.',
    product: 'Office Chair',
  },
  {
    name: 'Aisha Williams',
    role: 'Verified Buyer',
    avatar: 'AW',
    gradient: 'from-violet-500 to-purple-500',
    glow: '139,92,246',
    rating: 5,
    text: 'I was skeptical at first but the 30-day return policy gave me confidence to try. The product exceeded expectations so I never had to use it — but knowing it was there helped.',
    product: 'Smart Speaker',
  },
  {
    name: 'Tom Rodriguez',
    role: 'Verified Buyer',
    avatar: 'TR',
    gradient: 'from-cyan-500 to-blue-500',
    glow: '6,182,212',
    rating: 5,
    text: 'Fast shipping, great product, zero hassle. Exactly what you want from an online store. My go-to shop for gifts now — everyone I have bought for has loved their item.',
    product: 'Premium Headphones',
  },
]

function TestimonialCard({ testimonial }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='relative rounded-2xl overflow-hidden cursor-default'
      style={{
        boxShadow: hovered
          ? `0 20px 60px rgba(${testimonial.glow},0.2), 0 0 0 1px rgba(${testimonial.glow},0.3)`
          : '0 0 0 1px rgba(255,255,255,0.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className='bg-black p-6 h-full flex flex-col gap-4'>

        {/* Stars */}
        <div className='flex items-center gap-1'>
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={14}
              className='text-amber-400'
              style={{ fill: i < testimonial.rating ? '#fbbf24' : 'none' }}
            />
          ))}
        </div>

        {/* Quote */}
        <p className='text-neutral-300 text-sm leading-relaxed flex-1'>
          "{testimonial.text}"
        </p>

        {/* Product tag */}
        <div
          className='inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full border'
          style={{
            background: `rgba(${testimonial.glow},0.1)`,
            borderColor: `rgba(${testimonial.glow},0.3)`,
          }}
        >
          <span
            className='w-1.5 h-1.5 rounded-full'
            style={{ background: `rgba(${testimonial.glow},1)` }}
          />
          <span className='text-xs font-medium' style={{ color: `rgba(${testimonial.glow},1)` }}>
            {testimonial.product}
          </span>
        </div>

        {/* Author */}
        <div className='flex items-center gap-3 pt-2 border-t border-white/5'>
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {testimonial.avatar}
          </div>
          <div>
            <p className='text-white font-semibold text-sm'>{testimonial.name}</p>
            <p className='text-neutral-500 text-xs'>{testimonial.role}</p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className='relative w-full py-24 bg-neutral-900 overflow-hidden'>
      <Container>
        <ScrollReveal>
          <div className='text-center mb-16'>
            <p className='text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3'>
              Customer Reviews
            </p>
            <h2 className='text-4xl md:text-5xl font-black text-white mb-4'>
              Loved by <GradientText>Thousands</GradientText>
            </h2>
            <p className='text-neutral-400 text-lg max-w-xl mx-auto'>
              Do not just take our word for it. Here is what our customers actually think.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}