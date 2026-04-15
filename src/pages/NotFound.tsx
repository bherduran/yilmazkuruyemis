import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="max-w-md mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl mb-4">Sayfa Bulunamadı</h1>
      <Link to="/" className="text-caramel hover:text-coffee underline">
        Ana Sayfaya Dön
      </Link>
    </section>
  )
}
