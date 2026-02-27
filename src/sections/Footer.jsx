import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { Container } from '../components/layout/Container'

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/products' },
    { label: 'New Arrivals', href: '/products' },
    { label: 'Best Sellers', href: '/products' },
    { label: 'Sale', href: '/products' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Returns', href: '#' },
  ],
}

const socials = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiYoutube, href: '#', label: 'YouTube' },
]

const contactInfo = [
  { icon: FiMail, text: 'hello@shopname.com' },
  { icon: FiPhone, text: '+1 (555) 000-0000' },
  { icon: FiMapPin, text: 'New York, NY 10001' },
]

export function Footer() {
  return (
    <footer className="relative w-full bg-neutral-950 border-t border-white/5 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">

          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">ShopName</span>
            </Link>

            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium products for modern living. Curated with care,
              delivered with speed, backed by our satisfaction guarantee.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {contactInfo.map(function(item) {
                const Icon = item.icon
                return (
                  <div key={item.text} className="flex items-center gap-2 text-neutral-400 text-sm">
                    <Icon size={14} className="text-indigo-400 flex-shrink-0" />
                    {item.text}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              {socials.map(function(item) {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(function(entry) {
            const category = entry[0]
            const links = entry[1]
            return (
              <div key={category}>
                <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                  {category}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map(function(link) {
                    return (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="text-neutral-400 hover:text-white text-sm transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}

        </div>

        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">
            2026 ShopName. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>

      </Container>
    </footer>
  )
}