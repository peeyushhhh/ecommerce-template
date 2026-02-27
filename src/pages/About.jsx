import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiAward, FiUsers, FiGlobe } from 'react-icons/fi'
import { Container } from '../components/layout/Container'
import { GlassCard } from '../components/ui/GlassCard'
import { ScrollReveal } from '../components/shared/ScrollReveal'
import { GradientText } from '../components/shared/GradientText'
import { StatsSection } from '../sections/StatsSection'
import { Newsletter } from '../sections/Newsletter'
import { Footer } from '../sections/Footer'
import { staggerContainer, fadeUp, slideInLeft } from '../utils/animations'
import { HoverEffect } from '../components/ui/CardHoverEffect'

function ValueCard({ children, className, glow = '99,102,241' }) {
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative rounded-3xl bg-neutral-900 p-8 overflow-hidden cursor-default ${className}`}
      style={{
        boxShadow: isHovering
          ? `0 25px 60px rgba(${glow},0.2), 0 0 0 1px rgba(${glow},0.35)`
          : '0 0 0 1px rgba(255,255,255,0.07)',
        transition: 'box-shadow 0.4s ease, transform 0.3s ease',
        transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Rotating border */}
      {isHovering && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-10"
          style={{
            background: `conic-gradient(from ${angle}deg at ${mousePos.x}px ${mousePos.y}px, transparent 0deg, rgba(${glow},0.6) 40deg, transparent 80deg)`,
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
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glow},0.07), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden cursor-default group"
      style={{
        boxShadow: hovered
          ? `0 25px 60px rgba(${member.glow},0.35), 0 0 0 1px rgba(${member.glow},0.4)`
          : '0 0 0 1px rgba(255,255,255,0.08)',
        transition: 'box-shadow 0.4s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Default state */}
      <div
        className="relative p-8 flex flex-col items-center text-center transition-all duration-500"
        style={{
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
          background: '#171717',
        }}
      >
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg`}>
          {member.avatar}
        </div>
        <h3 className="text-white font-black text-lg mb-1">{member.name}</h3>
        <p className="text-neutral-400 text-sm">{member.role}</p>
      </div>

      {/* Hovered state — colorful */}
      <div
        className={`absolute inset-0 p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br ${member.gradient} transition-all duration-500`}
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.3), transparent 70%)',
          }}
        />

        <span className="text-5xl mb-4 relative z-10">{member.emoji}</span>
        <h3 className="text-white font-black text-xl mb-1 relative z-10">{member.name}</h3>
        <p className="text-white/80 text-sm mb-4 relative z-10">{member.role}</p>
        <p className="text-white/70 text-xs leading-relaxed relative z-10 italic">
          "{member.fact}"
        </p>
      </div>
    </motion.div>
  )
}

const values = [
  { icon: FiHeart, title: 'Customer First', description: 'Every decision we make starts with one question — is this good for our customers?' },
  { icon: FiAward, title: 'Quality Always', description: 'We only carry products we would buy ourselves. No compromises on materials or craftsmanship.' },
  { icon: FiUsers, title: 'Community Driven', description: 'Our customers shape what we stock. Reviews, feedback, and requests drive our buying decisions.' },
  { icon: FiGlobe, title: 'Sustainable Future', description: 'We partner with suppliers who share our commitment to ethical sourcing and eco-friendly packaging.' },
]

const team = [
  { name: 'Alex Carter', role: 'Founder & CEO', avatar: 'AC', color: 'from-indigo-500 to-violet-500' },
  { name: 'Maya Singh', role: 'Head of Product', avatar: 'MS', color: 'from-emerald-500 to-teal-500' },
  { name: 'Jordan Lee', role: 'Lead Designer', avatar: 'JL', color: 'from-pink-500 to-rose-500' },
  { name: 'Chris Wang', role: 'Head of Ops', avatar: 'CW', color: 'from-amber-500 to-orange-500' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950">

      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <Container narrow>
          <ScrollReveal>
            <div className="text-center">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">
                Built With <GradientText>Purpose</GradientText>
              </h1>
              <p className="text-neutral-400 text-xl leading-relaxed">
                ShopName started in 2020 with a simple idea — make it easy for people to find
                genuinely good products without wading through endless noise. We curate so you
                do not have to.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-neutral-900">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideInLeft}>
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">How We Started</p>
              <h2 className="text-4xl font-black text-white mb-6">
                From a Small Idea to <GradientText>50,000+ Customers</GradientText>
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Our founder Alex was frustrated with online shopping. Too many options, too little
                quality control, and zero accountability from sellers. So he started curating a
                small list of products he personally vouched for.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Word spread. That list became a newsletter, the newsletter became a store, and the
                store became ShopName — a community of people who believe that buying less but
                buying better is the smarter way to shop.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                  AC
                </div>
                <div>
                  <p className="text-white font-semibold">Alex Carter</p>
                  <p className="text-neutral-500 text-sm">Founder & CEO</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded', value: '2020' },
                { label: 'Products Curated', value: '500+' },
                { label: 'Countries Shipped', value: '42' },
                { label: 'Team Members', value: '28' },
              ].map(function(item) {
                return (
                  <GlassCard key={item.label} className="text-center">
                    <p className="text-3xl font-black text-white mb-1">{item.value}</p>
                    <p className="text-neutral-400 text-sm">{item.label}</p>
                  </GlassCard>
                )
              })}
            </motion.div>
          </motion.div>
        </Container>
      </div>

 
     {/* Values */}
<div className="py-20 bg-neutral-950">
  <Container>
    <ScrollReveal>
      <div className="text-center mb-16">
        <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">What We Stand For</p>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Our <GradientText>Values</GradientText>
        </h2>
      </div>
    </ScrollReveal>

   <HoverEffect items={[
  {
    icon: FiHeart,
    iconColor: 'text-indigo-400',
    title: 'Customer First',
    description: 'Every decision we make starts with one question — is this good for our customers? We obsess over the details so you do not have to.',
  },
  {
    icon: FiAward,
    iconColor: 'text-amber-400',
    title: 'Quality Always',
    description: 'We only carry products we would buy ourselves. No compromises on materials or craftsmanship — ever.',
  },
  {
    icon: FiUsers,
    iconColor: 'text-emerald-400',
    title: 'Community Driven',
    description: 'Our customers shape what we stock. Reviews, feedback, and requests drive every buying decision we make.',
  },
  {
    icon: FiGlobe,
    iconColor: 'text-violet-400',
    title: 'Sustainable Future',
    description: 'We partner with suppliers who share our commitment to ethical sourcing and eco-friendly packaging.',
  },
  {
    emoji: '🚀',
    title: 'Always Improving',
    description: 'We ship updates every week based on customer feedback. Our platform gets better every single day.',
  },
  {
    emoji: '🔒',
    title: 'Privacy First',
    description: 'Your data is yours. We never sell it, never share it, and always protect it with enterprise-grade security.',
  },
]} />
  </Container>
</div>

      {/* Team */}
 {/* Team */}
<div className="py-20 bg-neutral-900">
  <Container>
    <ScrollReveal>
      <div className="text-center mb-16">
        <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">The People</p>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Meet the <GradientText>Team</GradientText>
        </h2>
      </div>
    </ScrollReveal>

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {[
        { name: 'Alex Carter', role: 'Founder & CEO', avatar: 'AC', gradient: 'from-indigo-500 to-violet-600', bg: 'bg-indigo-950', glow: '99,102,241', emoji: '🚀', fact: 'Built the first version in a weekend' },
        { name: 'Maya Singh', role: 'Head of Product', avatar: 'MS', gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-950', glow: '16,185,129', emoji: '✨', fact: 'Redesigned checkout 3 times' },
        { name: 'Jordan Lee', role: 'Lead Designer', avatar: 'JL', gradient: 'from-pink-500 to-rose-500', bg: 'bg-pink-950', glow: '236,72,153', emoji: '🎨', fact: 'Obsessed with typography' },
        { name: 'Chris Wang', role: 'Head of Ops', avatar: 'CW', gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-950', glow: '245,158,11', emoji: '⚡', fact: 'Ships features before lunch' },
      ].map(function(member) {
        return (
          <TeamCard key={member.name} member={member} />
        )
      })}
    </motion.div>
  </Container>
</div>

      <StatsSection />
      <Newsletter />
      <Footer />
    </div>
  )
}