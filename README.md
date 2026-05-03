# ReplyKaro Dashboard

Clinic owner dashboard for [ReplyKaro](https://github.com/Vishnu99229/replykaro) — the AI-powered WhatsApp receptionist for dental and aesthetic clinics.

## Features

- 📊 **Dashboard** — Today's appointments, upcoming bookings, and AI conversations
- 👥 **Patients** — Searchable patient directory with appointment history
- 📈 **Analytics** — Booking trends, channel breakdown, and top treatments
- ⚙️ **Settings** — Clinic info and service pricing (read-only)
- 🌙 **Dark mode** — System-aware with manual toggle
- 📱 **Mobile-first** — Responsive layout with bottom navigation

## Tech Stack

- **React** (Vite)
- **Tailwind CSS** v4
- **Supabase** (direct client — no backend needed)
- **Recharts** (analytics charts)
- **React Router** (client-side routing)

## Setup

```bash
git clone https://github.com/Vishnu99229/replykaro-dashboard.git
cd replykaro-dashboard
npm install
```

Copy `.env.example` to `.env` and add your Supabase credentials:

```bash
cp .env.example .env
```

Run locally:

```bash
npm run dev
```

## Deployment (Vercel)

1. Import this repo on [vercel.com](https://vercel.com)
2. Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`
3. Deploy — that's it!

## License

Private — All rights reserved.
