import { Link } from 'react-router-dom'

const categories = [
  { name: 'Kahve', slug: 'kahve' },
  { name: 'Baharat', slug: 'baharat' },
  { name: 'Çikolata', slug: 'cikolata' },
  { name: 'Lokum', slug: 'lokum' },
  { name: 'Kuru Meyve', slug: 'kuru-meyve' },
  { name: 'Kuruyemiş', slug: 'kuruyemis' },
]

export default function Home() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="uppercase tracking-[0.3em] text-caramel text-xs mb-6">Bozyazı</p>
        <h1 className="text-5xl md:text-6xl font-serif text-coffee mb-6">
          Yılmaz Kuruyemiş
        </h1>
        <p className="text-lg text-ink/70 max-w-xl mx-auto mb-10">
          Kahve • Baharat • Çikolata • Lokum • Kuru Meyve
        </p>
        <Link
          to="/urunler"
          className="inline-block px-8 py-3 bg-coffee text-cream text-sm uppercase tracking-wide hover:bg-caramel transition-colors"
        >
          Ürünleri Gör
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl mb-6">Hakkımızda</h2>
        <p className="text-ink/80 leading-relaxed">
          Bozyazı'nın kalbinde, yıllardır kaliteli kuruyemiş, kahve, baharat, çikolata ve lokumu
          sizlerle buluşturuyoruz. Her ürünümüz özenle seçilir, tazeliğinden ödün verilmez.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl text-center mb-12">Kategoriler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/urunler?kategori=${c.slug}`}
              className="border border-coffee/15 bg-white py-10 text-center font-serif text-xl text-coffee hover:bg-coffee hover:text-cream transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl text-center mb-12">Dükkânımız</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square bg-coffee/5 border border-coffee/10 flex items-center justify-center text-ink/30 text-sm"
            >
              Fotoğraf {i}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
