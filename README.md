# Yılmaz Kuruyemiş

Promotional website for Yılmaz Kuruyemiş — a kuruyemiş / kahve / baharat / çikolata / lokum / kuru meyve shop in Bozyazı.

Turkish-language site with an owner-managed product catalog.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Supabase (Postgres + Storage + Auth)
- Deployed on Vercel

## Getting Started

```bash
npm install
cp .env.example .env   # fill in Supabase URL + anon key
npm run dev
```

## Pages

- `/` Ana Sayfa
- `/urunler` Ürünler
- `/iletisim` İletişim
- `/admin` Yönetim Paneli (owner only)

## Database

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null,
  unit text default 'kg',
  category text not null,
  photo_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create index products_category_idx on products(category);
```

Storage bucket: `product-photos` (public read)
RLS: public SELECT, authenticated INSERT/UPDATE/DELETE
