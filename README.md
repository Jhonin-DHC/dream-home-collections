# Dream Home Collections

Next.js 15 rebuild of [dreamhomecollections.com](https://dreamhomecollections.com) — luxury Texas real estate, blogs, and a buyer member portal.

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind v4, MongoDB, Cloudflare R2, JWT cookies, Nodemailer.

## Setup

1. Copy `.env.example` to `.env.local` and fill Mongo, `AUTH_SECRET`, admin credentials, R2, and SMTP.
2. `npm install`
3. `npm run seed` (optional — loads sample listings, neighborhoods, and posts)
4. `npm run dev`

Admin: `/admin/login`  
Members: Login / Register in the site header, then `/account`

## WordPress cutover

Keep existing permalinks (`/4000-euclid-avenue/`, `/highland-park-luxury-homes/`, `/dfw-best-places-to-invest-2026/`). Full media + XML migration is a later phase.
