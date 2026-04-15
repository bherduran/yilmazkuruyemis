import { useEffect, useState } from 'react'
import { supabase, type Product } from '../lib/supabase'

const categories = ['Tümü', 'Kahve', 'Baharat', 'Çikolata', 'Lokum', 'Kuru Meyve', 'Kuruyemiş']

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState('Tümü')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProducts(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = category === 'Tümü' ? products : products.filter((p) => p.category === category)

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl text-center mb-10">Ürünler</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 text-sm border transition-colors ${
              category === c
                ? 'bg-coffee text-cream border-coffee'
                : 'border-coffee/20 text-ink/70 hover:border-coffee'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-ink/50">Yükleniyor...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-ink/50">Bu kategoride henüz ürün yok.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="bg-white border border-coffee/10">
              <div className="aspect-square bg-coffee/5 overflow-hidden">
                {p.photo_url ? (
                  <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink/30 text-sm">
                    Fotoğraf yok
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-coffee mb-1">{p.name}</h3>
                <p className="text-ink/70 text-sm">
                  ₺{p.price.toLocaleString('tr-TR')} / {p.unit}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
