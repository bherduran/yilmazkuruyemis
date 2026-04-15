export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl text-center mb-12">İletişim</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Adres</h3>
            <p className="text-ink/80">Bozyazı, Mersin {/* TODO: full address */}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Telefon</h3>
            <a href="tel:+90" className="text-ink/80 hover:text-coffee">
              +90 (5XX) XXX XX XX {/* TODO */}
            </a>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Çalışma Saatleri</h3>
            <p className="text-ink/80">Pazartesi – Cumartesi: 09:00 – 21:00 {/* TODO */}</p>
            <p className="text-ink/80">Pazar: 10:00 – 20:00 {/* TODO */}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wide text-caramel mb-2">Sosyal Medya</h3>
            <a
              href="https://www.instagram.com/yilmazkuruyemisbozyazi/"
              target="_blank"
              rel="noreferrer"
              className="text-ink/80 hover:text-coffee"
            >
              Instagram: @yilmazkuruyemisbozyazi
            </a>
          </div>
        </div>

        <div className="aspect-square bg-coffee/5 border border-coffee/10 flex items-center justify-center text-ink/30">
          Harita (yakında)
        </div>
      </div>
    </section>
  )
}
