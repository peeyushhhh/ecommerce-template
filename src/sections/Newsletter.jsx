import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiArrowRight, FiGift } from 'react-icons/fi'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/shared/ScrollReveal'
import { GradientText } from '../components/shared/GradientText'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className='relative w-full py-24 bg-neutral-950 overflow-hidden'>

      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />

      <Container narrow>
        <ScrollReveal>
          <div className='text-center'>

            <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6'>
              <FiGift size={28} className='text-indigo-400' />
            </div>

            <h2 className='text-4xl md:text-5xl font-black text-white mb-4'>
              Get <GradientText>10% Off</GradientText> Your First Order
            </h2>
            <p className='text-neutral-300 text-lg mb-10 max-w-md mx-auto'>
              Subscribe to our newsletter and be the first to know about
              new arrivals, exclusive deals, and style tips.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
              >
                <div className='flex-1 relative'>
                  <FiMail size={18} className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500' />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    required
                    className='w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all duration-200'
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  className='px-6 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 whitespace-nowrap'
                >
                  Subscribe
                  <FiArrowRight size={16} />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className='inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              >
                <span className='text-2xl'>🎉</span>
                <div className='text-left'>
                  <p className='font-semibold'>You are in!</p>
                  <p className='text-sm text-emerald-400/70'>Check your inbox for your 10% discount code.</p>
                </div>
              </motion.div>
            )}

            <p className='text-neutral-500 text-xs mt-4'>
              No spam, ever. Unsubscribe at any time.
            </p>

          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}