import { Outlet, NavLink } from 'react-router-dom'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide uppercase transition-colors ${
    isActive ? 'text-coffee' : 'text-ink/60 hover:text-coffee'
  }`

export default function Layout() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-coffee/10 bg-cream/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <NavLink to="/" className="font-serif text-xl text-coffee">
            Yılmaz Kuruyemiş
          </NavLink>
          <nav className="flex gap-8">
            <NavLink to="/" end className={navLink}>Ana Sayfa</NavLink>
            <NavLink to="/urunler" className={navLink}>Ürünler</NavLink>
            <NavLink to="/iletisim" className={navLink}>İletişim</NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-coffee/10 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-ink/60 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Yılmaz Kuruyemiş — Bozyazı</span>
          <a
            href="https://www.instagram.com/yilmazkuruyemisbozyazi/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-coffee"
          >
            @yilmazkuruyemisbozyazi
          </a>
        </div>
      </footer>
    </div>
  )
}
