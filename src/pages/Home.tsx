import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const categories = ['Kahve', 'Baharat', 'Çikolata', 'Lokum', 'Kuru Meyve', 'Kuruyemiş']

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function Home() {
  return (
    <PageTransition>
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-24 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="uppercase tracking-[0.3em] text-caramel text-xs mb-6"
        >
          Bozyazı
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-serif text-coffee mb-6"
        >
          Yılmaz Kuruyemiş
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-lg text-ink/70 max-w-xl mx-auto mb-10"
        >
          Kahve • Baharat • Çikolata • Lokum • Kuru Meyve
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Link
            to="/urunler"
            className="inline-block px-8 py-3 bg-coffee text-cream text-sm uppercase tracking-wide hover:bg-caramel transition-colors"
          >
            Ürünleri Gör
          </Link>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 py-10 md:py-16 text-center"
      >
        <h2 className="text-3xl mb-6">Hakkımızda</h2>
        <p className="text-ink/80 leading-relaxed">
          Bozyazı'nın kalbinde, yıllardır kaliteli kuruyemiş, kahve, baharat, çikolata ve lokumu
          sizlerle buluşturuyoruz. Her ürünümüz özenle seçilir, tazeliğinden ödün verilmez.
        </p>
      </motion.section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl text-center mb-8 md:mb-12"
        >
          Kategoriler
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {categories.map((c) => (
            <motion.div key={c} variants={fadeUp}>
              <Link
                to={`/urunler?kategori=${encodeURIComponent(c)}`}
                className="block border border-coffee/15 bg-white py-7 md:py-10 text-center font-serif text-lg md:text-xl text-coffee hover:bg-coffee hover:text-cream transition-colors duration-200"
              >
                {c}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl text-center mb-8 md:mb-12"
        >
          Dükkânımız
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="aspect-square bg-coffee/5 border border-coffee/10 flex items-center justify-center text-ink/30 text-sm"
            >
              Fotoğraf {i}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  )
}
