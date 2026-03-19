# Agnos Patient Registration System

Real-time patient input form with live staff monitoring dashboard. Built with **Next.js 14**, **TailwindCSS**, and **Supabase Realtime**.

## Live Demo

> Deploy to Vercel (see below) and share the `/patient` URL with patients and `/staff` with staff.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | TailwindCSS |
| Real-time sync | Supabase Realtime (PostgreSQL → WebSocket) |
| Form validation | React Hook Form + Zod |
| Fonts | DM Sans + DM Serif Display (Google Fonts) |
| Hosting | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home / navigation hub
│   ├── layout.tsx            # Root layout with fonts & metadata
│   ├── globals.css           # Tailwind base + custom component classes
│   ├── patient/
│   │   └── page.tsx          # Patient registration form
│   └── staff/
│       └── page.tsx          # Staff live monitor dashboard
├── components/
│   ├── shared/
│   │   └── StatusIndicator.tsx   # Idle / Typing / Submitted badge
│   └── staff/
│       └── SessionCard.tsx       # Per-patient card with flash animations
├── hooks/
│   ├── usePatientSession.ts  # Patient-side Supabase upsert + debounce
│   └── useStaffView.ts       # Staff-side Supabase Realtime subscription
├── lib/
│   ├── supabase.ts           # Supabase client (typed)
│   └── validation.ts         # Zod schema for all form fields
└── types/
    └── patient.ts            # Shared TypeScript types
supabase/
└── schema.sql                # Run this once in Supabase SQL editor
```

---

## Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/your-username/agnos-patient-form.git
cd agnos-patient-form
npm install
```

### 2. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Note your **Project URL** and **Anon Key** (Settings → API)

### 3. Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor → New Query**
2. Paste the contents of `supabase/schema.sql` and run it
3. This creates the `patient_sessions` table and enables Realtime

### 4. Enable Realtime (if not done via SQL)

In Supabase Dashboard:
- Go to **Database → Replication**
- Under "Supabase Realtime", toggle ON for the `patient_sessions` table

### 5. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Run Locally

```bash
npm run dev
```

Open:
- [http://localhost:3000/patient](http://localhost:3000/patient) — Patient form
- [http://localhost:3000/staff](http://localhost:3000/staff) — Staff monitor

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Or connect via Vercel dashboard:
1. Import the GitHub repository
2. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Deploy — Vercel auto-detects Next.js

---

## How Real-Time Sync Works

```
Patient types in form
       ↓
usePatientSession hook (debounced 2s)
       ↓
Supabase JS client: upsert patient_sessions row
       ↓
Supabase PostgreSQL triggers change event
       ↓
Supabase Realtime broadcasts over WebSocket
       ↓
useStaffView hook receives postgres_changes event
       ↓
Staff dashboard updates instantly with flash animation
```

**No custom WebSocket server needed** — Supabase manages the entire pub/sub infrastructure. The patient form writes directly to the database; the staff view subscribes to row-level changes.

---

## Features

### Patient Form
- All required fields with inline validation
- Real-time sync on every keystroke (debounced)
- Status indicator: Idle / Typing / Submitted
- Responsive (mobile & desktop)
- Success state after submission

### Staff View
- Live session cards — one per patient
- Per-field flash animation on update
- Progress bar showing form completion %
- Grouped by status: Active / Submitted / Idle
- Summary stats: active now, submitted, total
- Connection indicator (Live / Connecting)

### Bonus Features
- Session persistence via `sessionStorage` (patient can refresh without losing session)
- Typed Supabase client (full TypeScript)
- Zod validation with custom error messages
- Zero server-side API routes needed

---

## Development Planning

### Design Decisions

**Why Supabase Realtime over raw WebSockets?**
- No backend server to deploy or maintain
- PostgreSQL row-level events = data is automatically persisted
- Free tier sufficient for the assignment scale
- Typed client with great Next.js/React integration

**Why React Hook Form + Zod?**
- Minimal re-renders (uncontrolled inputs)
- Schema-based validation is reusable and testable
- Type inference from schema to form values

**Responsive approach**
- Single-column on mobile, multi-column grid on tablet/desktop
- Tailwind breakpoints: `sm:` at 640px for form column splits
- Staff cards: 1 column → 2 → 3 at sm/lg breakpoints

### Component Architecture

| Component | Purpose |
|---|---|
| `usePatientSession` | Manages session ID, debounces Supabase writes, handles submit |
| `useStaffView` | Loads initial sessions, subscribes to Realtime channel |
| `StatusIndicator` | Reusable badge used in both patient header and staff cards |
| `SessionCard` | Staff-side card with `FlashValue` subcomponent for update animations |

---

## License

MIT
