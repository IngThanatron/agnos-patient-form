-- Run this SQL in your Supabase SQL editor
-- Dashboard > SQL Editor > New Query

-- Create patient_sessions table
create table if not exists public.patient_sessions (
  id            uuid default gen_random_uuid() primary key,
  session_id    text not null unique,
  status        text not null default 'idle'
                  check (status in ('idle', 'typing', 'submitted')),
  form_data     jsonb not null default '{}'::jsonb,
  last_activity timestamptz not null default now(),
  submitted_at  timestamptz,
  created_at    timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.patient_sessions enable row level security;

-- Allow anonymous users to insert new sessions
create policy "Anyone can create a session"
  on public.patient_sessions
  for insert
  with check (true);

-- Allow anyone to update any session (scoped by session_id in app logic)
create policy "Anyone can update a session"
  on public.patient_sessions
  for update
  using (true);

-- Allow anyone to read sessions (staff view)
create policy "Anyone can read sessions"
  on public.patient_sessions
  for select
  using (true);

-- Enable Realtime on this table
-- Dashboard > Database > Replication > Supabase Realtime
-- Toggle ON for: patient_sessions
-- OR run:
alter publication supabase_realtime add table public.patient_sessions;

-- Optional: auto-clean sessions older than 24 hours (run as cron or manually)
-- delete from public.patient_sessions where created_at < now() - interval '24 hours';
