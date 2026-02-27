import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'
import { Container } from './Container'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className={cn(
    'w-full transition-all duration-300',
    scrolled
      ? 'bg-neutral-950 border-b border-white/10 py-3'
      : 'bg-transparent py-5'
  )}
>
      <Container>
        <div className='flex items-center justify-between'>

          {/* Logo */}
          <Link to='/' className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center'>
              <span className='text-white font-black text-sm'>S</span>
            </div>
            <span className='text-white font-bold text-xl tracking-tight'>ShopName</span>
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className='text-neutral-400 hover:text-white text-sm font-medium transition-colors duration-200'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className='hidden md:flex items-center gap-4'>
            <button className='relative text-neutral-400 hover:text-white transition-colors'>
              <FiShoppingCart size={22} />
              <span className='absolute -top-2 -right-2 w-5 h-5 bg-indigo-500 rounded-full text-white text-xs flex items-center justify-center font-bold'>
                3
              </span>
            </button>
            <Button size='sm'>Shop Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-white'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='md:hidden mt-4 pb-4 border-t border-white/10'
          >
            <nav className='flex flex-col gap-4 pt-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className='text-neutral-400 hover:text-white text-sm font-medium transition-colors'
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button size='sm' className='w-fit'>Shop Now</Button>
            </nav>
          </motion.div>
        )}

      </Container>
    </motion.header>
  )
}