import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, type Product } from '../lib/supabase'
import PageTransition from '../components/PageTransition'

const categories = ['Tümü', 'Kahve', 'Baharat', 'Çikolata', 'Lokum', 'Kuru Meyve', 'Kuruyemiş']

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const paramCategory = searchParams.get('kategori') ?? ''
  const category = categories.includes(paramCategory) ? paramCategory : 'Tümü'

  function setCategory(c: string) {
    if (c === 'Tümü') {
      setSearchParams({})
    } else {
      setSearchParams({ kategori: c })
    }
  }

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
    <PageTransition>
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl text-center mb-8 md:mb-10">Ürünler</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <motion.button
              key={c}
              onClick={() => setCategory(c)}
              whileTap={{ scale: 0.96 }}
              className={`px-4 py-2 text-sm border transition-colors ${
                category === c
                  ? 'bg-coffee text-cream border-coffee'
                  : 'border-coffee/20 text-ink/70 hover:border-coffee'
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-ink/50">Yükleniyor...</p>
        ) : filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-ink/50"
          >
            Bu kategoride henüz ürün yok.
          </motion.p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filtered.map((p) => (
                <motion.article key={p.id} variants={cardVariants} className="bg-white border border-coffee/10">
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
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </PageTransition>
  )
}
