# Jorge & Beatriz — Wedding Website

Nuxt 4 + Cloudflare Pages + D1 + Drizzle ORM + Tailwind CSS

---

## Local Development

```bash
npm install
npm run dev
```

---

## Database Setup (one time)

### 1. Create the D1 database on Cloudflare
```bash
npx wrangler d1 create wedding-db
```
Copy the returned `database_id` and paste it into `wrangler.toml` → `database_id`.

### 2. Generate migration SQL (already committed in server/db/migrations/)
```bash
npm run db:generate
```

### 3. Apply migrations locally (for `wrangler dev`)
```bash
npm run db:migrate:local
```

### 4. Apply migrations to the remote D1 database
```bash
npm run db:migrate:remote
```

---

## Environment Variables

Set these in the Cloudflare Pages dashboard under **Settings → Environment Variables**:

| Variable     | Description           |
|--------------|-----------------------|
| `ADMIN_USER` | Admin panel username  |
| `ADMIN_PASS` | Admin panel password  |

For local development, create a `.env` file:
```
ADMIN_USER=admin
ADMIN_PASS=yourpassword
```

---

## Deploy to Cloudflare Pages

```bash
npm run deploy
```

Runs `nuxt build` (outputs to `.output/public`) then deploys via Wrangler.

---

## Photo Gallery

Drop real photos into `public/images/` named:
`photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`, `photo-4.jpg`, `photo-5.jpg`

---

## Admin Panel

Navigate to `/secreto-admin-dashboard` (redirects to login if unauthenticated).

---

## Stack

- **Framework**: Nuxt 4 (Vue 3, SSR)  · **Hosting**: Cloudflare Pages
- **Database**: Cloudflare D1  · **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS + Cormorant Garamond + Inter
- **Animation**: GSAP (free)  · **Slider**: Swiper.js
- **Validation**: Zod  · **Map**: OpenStreetMap embed
