import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageSquare } from 'react-icons/fi'
import { Container } from '../components/layout/Container'
import { GlassCard } from '../components/ui/GlassCard'
import { ScrollReveal } from '../components/shared/ScrollReveal'
import { GradientText } from '../components/shared/GradientText'
import { Footer } from '../sections/Footer'
import { staggerContainer, fadeUp } from '../utils/animations'

const contactInfo = [
  {
    icon: FiMail,
    title: 'Email Us',
    value: 'hello@shopname.com',
    sub: 'We reply within 24 hours',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    icon: FiPhone,
    title: 'Call Us',
    value: '+1 (555) 000-0000',
    sub: 'Mon–Fri, 9am–6pm EST',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: FiMapPin,
    title: 'Visit Us',
    value: '123 Commerce St',
    sub: 'New York, NY 10001',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: FiClock,
    title: 'Working Hours',
    value: 'Mon–Fri: 9am–6pm',
    sub: 'Sat: 10am–4pm EST',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
]

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days. Express shipping is available at checkout for 1–2 day delivery.' },
  { q: 'What is your return policy?', a: 'We offer hassle-free 30-day returns on all items. Just contact us and we will arrange a pickup or drop-off.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship to 42 countries. International shipping times vary between 7–14 business days.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you will receive a tracking link via email. You can also check your order status in your account.' },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors duration-200"
      >
        <span className="text-white font-medium text-sm">{faq.q}</span>
        <span className={`text-indigo-400 text-xl font-light transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-5 pb-5"
        >
          <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.name && form.email && form.message) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-neutral-950">

      {/* Header */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <Container>
          <ScrollReveal>
            <div className="text-center">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                We are Here to <GradientText>Help</GradientText>
              </h1>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                Have a question, issue, or just want to say hello? We would love to hear from you.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      <Container>

        {/* Contact Info Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {contactInfo.map(function(item) {
            const Icon = item.icon
            return (
              <motion.div key={item.title} variants={fadeUp}>
                <GlassCard className="text-center h-full">
                  <div className={`w-12 h-12 rounded-xl border ${item.bg} flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-white text-sm font-medium mb-1">{item.value}</p>
                  <p className="text-neutral-500 text-xs">{item.sub}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-24">

          {/* Contact Form */}
          <ScrollReveal>
            <GlassCard hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <FiMessageSquare size={18} className="text-indigo-400" />
                </div>
                <h2 className="text-white font-bold text-xl">Send a Message</h2>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-400 text-xs font-medium uppercase tracking-widest block mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 text-xs font-medium uppercase tracking-widest block mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 text-xs font-medium uppercase tracking-widest block mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 text-xs font-medium uppercase tracking-widest block mb-2">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <FiSend size={16} />
                    Send Message
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <span className="text-5xl mb-4">🎉</span>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-neutral-400 text-sm">We will get back to you within 24 hours.</p>
                </motion.div>
              )}
            </GlassCard>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <div>
              <h2 className="text-white font-bold text-xl mb-6">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-3">
                {faqs.map(function(faq, i) {
                  return <FAQItem key={i} faq={faq} />
                })}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </Container>

      <Footer />
    </div>
  )
}