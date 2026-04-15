import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function Contact() {
  return (
    <PageTransition>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl text-center mb-12">İletişim</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Adres</h3>
              <p className="text-ink/80">Bozyazı, Mersin {/* TODO: full address */}</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Telefon</h3>
              <a href="tel:+90" className="text-ink/80 hover:text-coffee transition-colors">
                +90 (5XX) XXX XX XX {/* TODO */}
              </a>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Çalışma Saatleri</h3>
              <p className="text-ink/80">Pazartesi – Cumartesi: 09:00 – 21:00 {/* TODO */}</p>
              <p className="text-ink/80">Pazar: 10:00 – 20:00 {/* TODO */}</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Sosyal Medya</h3>
              <a
                href="https://www.instagram.com/yilmazkuruyemisbozyazi/"
                target="_blank"
                rel="noreferrer"
                className="text-ink/80 hover:text-coffee transition-colors"
              >
                Instagram: @yilmazkuruyemisbozyazi
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="aspect-square bg-coffee/5 border border-coffee/10 flex items-center justify-center text-ink/30"
          >
            Harita (yakında)
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
