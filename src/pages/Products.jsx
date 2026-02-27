import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiStar, FiHeart, FiSearch, FiFilter } from 'react-icons/fi'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { Footer } from '../sections/Footer'
import { staggerContainer, fadeUp } from '../utils/animations'

const allProducts = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 89, originalPrice: 129, rating: 4.9, reviews: 2400, badge: 'Best Seller', badgeColor: 'bg-amber-500', gradient: 'from-indigo-500/20 to-violet-500/20' },
  { id: 2, name: 'Minimalist Leather Watch', category: 'Accessories', price: 159, originalPrice: 199, rating: 4.8, reviews: 1800, badge: 'New', badgeColor: 'bg-emerald-500', gradient: 'from-amber-500/20 to-orange-500/20' },
  { id: 3, name: 'Ergonomic Office Chair', category: 'Furniture', price: 299, originalPrice: 399, rating: 4.7, reviews: 956, badge: '25% Off', badgeColor: 'bg-indigo-500', gradient: 'from-emerald-500/20 to-teal-500/20' },
  { id: 4, name: 'Smart Fitness Tracker', category: 'Wearables', price: 49, originalPrice: 79, rating: 4.6, reviews: 3200, badge: 'Popular', badgeColor: 'bg-pink-500', gradient: 'from-pink-500/20 to-rose-500/20' },
  { id: 5, name: 'Mechanical Keyboard', category: 'Electronics', price: 129, originalPrice: 169, rating: 4.8, reviews: 1100, badge: 'Hot', badgeColor: 'bg-red-500', gradient: 'from-red-500/20 to-orange-500/20' },
  { id: 6, name: 'Ceramic Coffee Set', category: 'Home', price: 59, originalPrice: 79, rating: 4.5, reviews: 640, badge: 'New', badgeColor: 'bg-emerald-500', gradient: 'from-yellow-500/20 to-amber-500/20' },
  { id: 7, name: 'Yoga Mat Premium', category: 'Sports', price: 45, originalPrice: 65, rating: 4.7, reviews: 890, badge: 'Sale', badgeColor: 'bg-violet-500', gradient: 'from-violet-500/20 to-purple-500/20' },
  { id: 8, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 79, originalPrice: 99, rating: 4.6, reviews: 2100, badge: 'Best Seller', badgeColor: 'bg-amber-500', gradient: 'from-cyan-500/20 to-blue-500/20' },
]

const categories = ['All', 'Electronics', 'Accessories', 'Furniture', 'Wearables', 'Home', 'Sports']

function ProductCard({ product }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className={`relative w-full h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
        <FiShoppingCart size={48} className="text-white/20" />
        <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
          {product.badge}
        </span>
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-pink-400 transition-colors">
          <FiHeart size={15} />
        </button>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button size="sm">
            <FiShoppingCart size={15} />
            Quick Add
          </Button>
        </div>
      </div>

      <div className="p-5">
        <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="text-white font-bold text-base mb-3 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={12} className="text-amber-400" style={{ fill: i < Math.floor(product.rating) ? '#fbbf24' : 'none' }} />
            ))}
          </div>
          <span className="text-neutral-400 text-xs">{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white font-black text-xl">${product.price}</span>
            <span className="text-neutral-500 text-sm line-through ml-2">${product.originalPrice}</span>
          </div>
          <button className="w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white transition-colors">
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allProducts.filter(function(p) {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-neutral-950">

      {/* Page Header */}
      <div className="relative pt-32 pb-16 bg-neutral-950 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <Container>
          <div className="text-center">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Collection</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">All Products</h1>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">
              Browse our full collection of premium products, curated for modern living.
            </p>
          </div>
        </Container>
      </div>

      <Container>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">

          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(function(cat) {
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

        </div>

        {/* Results count */}
        <p className="text-neutral-500 text-sm mb-6">
          Showing {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-24"
          >
            {filtered.map(function(product) {
              return <ProductCard key={product.id} product={product} />
            })}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <p className="text-neutral-500 text-lg">No products found.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearch('') }}
              className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

      </Container>

      <Footer />
    </div>
  )
}