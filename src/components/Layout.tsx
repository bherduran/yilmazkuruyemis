import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide uppercase transition-colors ${
    isActive ? 'text-coffee' : 'text-ink/60 hover:text-coffee'
  }`

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Show scroll-to-top after 300px
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-coffee/10 bg-cream/90 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="font-serif text-lg md:text-xl text-coffee">
            Yılmaz Kuruyemiş
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8">
            <NavLink to="/" end className={navLinkClass}>Ana Sayfa</NavLink>
            <NavLink to="/urunler" className={navLinkClass}>Ürünler</NavLink>
            <NavLink to="/iletisim" className={navLinkClass}>İletişim</NavLink>
          </nav>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none"
            aria-label="Menü"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-6 bg-coffee origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-px w-6 bg-coffee"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-6 bg-coffee origin-center"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-coffee/10 bg-cream"
            >
              <div className="flex flex-col px-6 py-4 gap-5">
                <NavLink to="/" end className={navLinkClass}>Ana Sayfa</NavLink>
                <NavLink to="/urunler" className={navLinkClass}>Ürünler</NavLink>
                <NavLink to="/iletisim" className={navLinkClass}>İletişim</NavLink>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-coffee/10 mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-ink/60 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Yılmaz Kuruyemiş — Bozyazı</span>
          <a
            href="https://www.instagram.com/yilmazkuruyemisbozyazi/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-coffee transition-colors"
          >
            @yilmazkuruyemisbozyazi
          </a>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-30 w-11 h-11 bg-coffee text-cream flex items-center justify-center shadow-md hover:bg-caramel transition-colors"
            aria-label="Yukarı çık"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
