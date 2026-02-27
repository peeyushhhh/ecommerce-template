import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones, FiArrowRight } from 'react-icons/fi'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/shared/ScrollReveal'
import { GradientText } from '../components/shared/GradientText'
import { staggerContainer, fadeUp } from '../utils/animations'

function BentoCard({ children, className, glowColor = '99,102,241', delay = 0 }) {
  const cardRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [angle, setAngle] = useState(0)

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
    const cx = rect.width / 2
    const cy = rect.height / 2
    const deg = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90
    setAngle(deg)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      custom={delay}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative rounded-3xl bg-neutral-900 overflow-hidden cursor-default ${className}`}
      style={{
        boxShadow: isHovering
          ? `0 30px 80px rgba(${glowColor},0.25), 0 0 0 1px rgba(${glowColor},0.4)`
          : '0 0 0 1px rgba(255,255,255,0.07)',
        transition: 'box-shadow 0.4s ease, transform 0.2s ease',
        transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Rotating conic border */}
      {isHovering && (
        <div
          className='absolute inset-0 rounded-3xl pointer-events-none z-10'
          style={{
            background: `conic-gradient(from ${angle}deg at ${mousePos.x}px ${mousePos.y}px, transparent 0deg, rgba(${glowColor},0.6) 40deg, transparent 80deg)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Spotlight */}
      {isHovering && (
        <div
          className='absolute inset-0 pointer-events-none z-0'
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor},0.08), transparent 70%)`,
          }}
        />
      )}

      <div className='relative z-10 h-full'>{children}</div>
    </motion.div>
  )
}

export function Features() {
  return (
    <section className='relative w-full py-24 bg-neutral-950 overflow-hidden'>
      <Container>
        <ScrollReveal>
          <div className='text-center mb-16'>
            <p className='text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3'>
              Why Choose Us
            </p>
            <h2 className='text-4xl md:text-5xl font-black text-white mb-4'>
              Shopping Made <GradientText>Effortless</GradientText>
            </h2>
            <p className='text-neutral-400 text-lg max-w-xl mx-auto'>
              Everything we do is designed to make your experience smoother, safer, and more enjoyable.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto'
        >

          {/* CARD 1 — Large, Free Shipping */}
          <BentoCard className='lg:col-span-2 p-8 min-h-[240px]' glowColor='99,102,241'>
            <div className='flex flex-col h-full justify-between'>
              <div className='flex items-start justify-between'>
                <div>
                  <div className='w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6'>
                    <FiTruck size={26} className='text-indigo-400' />
                  </div>
                  <h3 className='text-white font-black text-2xl mb-2'>Free Shipping</h3>
                  <p className='text-neutral-400 text-base leading-relaxed max-w-sm'>
                    Free delivery on all orders over $50. Express options available at checkout for next-day delivery.
                  </p>
                </div>
                {/* Big decorative number */}
                <span className='text-[120px] font-black leading-none text-indigo-500/10 select-none hidden lg:block'>
                  01
                </span>
              </div>
              <div className='flex items-center gap-2 text-indigo-400 text-sm font-semibold mt-6 group'>
                <span>Learn more</span>
                <FiArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
              </div>
            </div>
          </BentoCard>

          {/* CARD 2 — Small, Returns */}
          <BentoCard className='p-8 min-h-[240px]' glowColor='139,92,246'>
            <div className='flex flex-col h-full justify-between'>
              <div>
                <div className='w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6'>
                  <FiRefreshCw size={26} className='text-violet-400' />
                </div>
                <h3 className='text-white font-black text-xl mb-2'>30-Day Returns</h3>
                <p className='text-neutral-400 text-sm leading-relaxed'>
                  Not satisfied? Return anything within 30 days for a full refund, no questions asked.
                </p>
              </div>
              <div className='mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 w-fit'>
                <span className='w-2 h-2 rounded-full bg-violet-400 animate-pulse' />
                <span className='text-violet-400 text-xs font-semibold'>Hassle free</span>
              </div>
            </div>
          </BentoCard>

          {/* CARD 3 — Small, Secure */}
          <BentoCard className='p-8 min-h-[220px]' glowColor='16,185,129'>
            <div className='flex flex-col h-full justify-between'>
              <div>
                <div className='w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6'>
                  <FiShield size={26} className='text-emerald-400' />
                </div>
                <h3 className='text-white font-black text-xl mb-2'>Secure Checkout</h3>
                <p className='text-neutral-400 text-sm leading-relaxed'>
                  Your payment info is encrypted and never stored. Shop with complete confidence.
                </p>
              </div>
              <div className='mt-6 flex items-center gap-3'>
                {['256-bit SSL', 'PCI DSS'].map((badge) => (
                  <span key={badge} className='text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-medium'>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* CARD 4 — Large, Support */}
          <BentoCard className='lg:col-span-2 p-8 min-h-[220px]' glowColor='245,158,11'>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between h-full gap-8'>
              <div className='flex-1'>
                <div className='w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6'>
                  <FiHeadphones size={26} className='text-amber-400' />
                </div>
                <h3 className='text-white font-black text-2xl mb-2'>24/7 Support</h3>
                <p className='text-neutral-400 text-base leading-relaxed max-w-sm'>
                  Real humans ready to help around the clock. Chat, email, or call — we have got you covered every step of the way.
                </p>
              </div>

              {/* Live support visual */}
              <div className='flex flex-col gap-3 min-w-[200px]'>
                {[
                  { time: '2m ago', msg: 'Order shipped! 🎉', color: 'bg-emerald-500' },
                  { time: 'Just now', msg: 'How can I help you?', color: 'bg-amber-500' },
                ].map((item, i) => (
                  <div key={i} className='flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/10'>
                    <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                    <div>
                      <p className='text-white text-xs font-medium'>{item.msg}</p>
                      <p className='text-neutral-500 text-xs'>{item.time}</p>
                    </div>
                  </div>
                ))}
                <div className='flex items-center gap-2 px-4 py-2'>
                  <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                  <span className='text-emerald-400 text-xs font-medium'>3 agents online now</span>
                </div>
              </div>
            </div>
          </BentoCard>

        </motion.div>
      </Container>
    </section>
  )
}