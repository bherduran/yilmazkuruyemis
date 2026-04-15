import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, type Product } from '../lib/supabase'
import PageTransition from '../components/PageTransition'

const CATEGORIES = ['Kahve', 'Baharat', 'Çikolata', 'Lokum', 'Kuru Meyve', 'Kuruyemiş']
const UNITS = ['kg', 'adet', 'gr']

type FormState = {
  name: string
  price: string
  unit: string
  category: string
  photo_url: string
  is_active: boolean
}

const empty: FormState = {
  name: '',
  price: '',
  unit: 'kg',
  category: 'Kahve',
  photo_url: '',
  is_active: true,
}

export default function Admin() {
  const [session, setSession] = useState<boolean | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<FormState>(empty)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session)
      if (data.session) fetchProducts()
    })
  }, [])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setLoginError('E-posta veya şifre hatalı.')
    } else {
      setSession(true)
      fetchProducts()
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    setSession(false)
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data ?? [])
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('product-photos').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('product-photos').getPublicUrl(path)
      setForm((f) => ({ ...f, photo_url: data.publicUrl }))
    }
    setUploading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      unit: form.unit,
      category: form.category,
      photo_url: form.photo_url || null,
      is_active: form.is_active,
    }
    if (editingId) {
      await supabase.from('products').update(payload).eq('id', editingId)
    } else {
      await supabase.from('products').insert(payload)
    }
    await fetchProducts()
    setForm(empty)
    setEditingId(null)
    setShowForm(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return
    await supabase.from('products').delete().eq('id', id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  function startEdit(p: Product) {
    setForm({
      name: p.name,
      price: String(p.price),
      unit: p.unit,
      category: p.category,
      photo_url: p.photo_url ?? '',
      is_active: p.is_active,
    })
    setEditingId(p.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelForm() {
    setForm(empty)
    setEditingId(null)
    setShowForm(false)
  }

  if (session === null) return null

  if (!session) {
    return (
      <PageTransition>
        <div className="max-w-sm mx-auto px-6 py-24">
          <h1 className="text-3xl text-center mb-8">Yönetim Paneli</h1>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-sm text-ink/70 mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-coffee/20 px-4 py-2 text-sm focus:outline-none focus:border-coffee bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-ink/70 mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-coffee/20 px-4 py-2 text-sm focus:outline-none focus:border-coffee bg-white"
              />
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-coffee text-cream py-2.5 text-sm uppercase tracking-wide hover:bg-caramel transition-colors"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl">Ürün Yönetimi</h1>
          <div className="flex gap-3">
            {!showForm && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowForm(true)}
                className="px-5 py-2 bg-coffee text-cream text-sm hover:bg-caramel transition-colors"
              >
                + Ürün Ekle
              </motion.button>
            )}
            <button
              onClick={logout}
              className="px-5 py-2 border border-coffee/20 text-sm text-ink/60 hover:border-coffee transition-colors"
            >
              Çıkış
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-coffee/10 p-6 mb-10"
            >
              <h2 className="text-xl mb-6">{editingId ? 'Ürünü Düzenle' : 'Yeni Ürün'}</h2>
              <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-ink/70 mb-1">Ürün Adı</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full border border-coffee/20 px-3 py-2 text-sm focus:outline-none focus:border-coffee"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink/70 mb-1">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full border border-coffee/20 px-3 py-2 text-sm focus:outline-none focus:border-coffee bg-white"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-ink/70 mb-1">Fiyat (₺)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    required
                    className="w-full border border-coffee/20 px-3 py-2 text-sm focus:outline-none focus:border-coffee"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink/70 mb-1">Birim</label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                    className="w-full border border-coffee/20 px-3 py-2 text-sm focus:outline-none focus:border-coffee bg-white"
                  >
                    {UNITS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-ink/70 mb-1">Fotoğraf</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="text-sm text-ink/70"
                  />
                  {uploading && <p className="text-xs text-caramel mt-1">Yükleniyor...</p>}
                  {form.photo_url && (
                    <img src={form.photo_url} alt="preview" className="mt-2 h-20 w-20 object-cover border border-coffee/10" />
                  )}
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={form.is_active}
                    onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                    className="accent-coffee"
                  />
                  <label htmlFor="is_active" className="text-sm text-ink/70">Aktif (sitede göster)</label>
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="px-6 py-2 bg-coffee text-cream text-sm hover:bg-caramel transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="px-6 py-2 border border-coffee/20 text-sm text-ink/60 hover:border-coffee transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {products.length === 0 ? (
          <p className="text-center text-ink/50 py-16">Henüz ürün yok. "Ürün Ekle" ile başlayın.</p>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="divide-y divide-coffee/10"
          >
            {products.map((p) => (
              <motion.div
                key={p.id}
                variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                className="flex items-center gap-4 py-4"
              >
                <div className="w-14 h-14 bg-coffee/5 border border-coffee/10 flex-shrink-0 overflow-hidden">
                  {p.photo_url
                    ? <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-ink/20 text-xs">YOK</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-coffee truncate">{p.name}</p>
                  <p className="text-sm text-ink/60">{p.category} · ₺{p.price.toLocaleString('tr-TR')} / {p.unit}</p>
                </div>
                {!p.is_active && (
                  <span className="text-xs border border-ink/20 text-ink/40 px-2 py-0.5">Pasif</span>
                )}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-sm text-caramel hover:text-coffee transition-colors"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-sm text-red-400 hover:text-red-600 transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
