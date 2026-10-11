-- Run once in Supabase SQL Editor AFTER profiles and run_group_members are populated for both users.
create table if not exists public.fitbros_user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.fitbros_shared_state (
  id integer primary key check (id = 1),
  data jsonb not null default '{"logs": [], "points": {"Amr": 0, "Ziad": 0}}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.fitbros_user_state enable row level security;
alter table public.fitbros_shared_state enable row level security;

drop policy if exists "fitbros_user_state_select_own" on public.fitbros_user_state;
create policy "fitbros_user_state_select_own" on public.fitbros_user_state for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "fitbros_user_state_insert_own" on public.fitbros_user_state;
create policy "fitbros_user_state_insert_own" on public.fitbros_user_state for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "fitbros_user_state_update_own" on public.fitbros_user_state;
create policy "fitbros_user_state_update_own" on public.fitbros_user_state for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "fitbros_shared_select_members" on public.fitbros_shared_state;
create policy "fitbros_shared_select_members" on public.fitbros_shared_state for select to authenticated using (exists (select 1 from public.run_group_members m where m.user_id = (select auth.uid())));
drop policy if exists "fitbros_shared_insert_members" on public.fitbros_shared_state;
create policy "fitbros_shared_insert_members" on public.fitbros_shared_state for insert to authenticated with check (id = 1 and exists (select 1 from public.run_group_members m where m.user_id = (select auth.uid())));
drop policy if exists "fitbros_shared_update_members" on public.fitbros_shared_state;
create policy "fitbros_shared_update_members" on public.fitbros_shared_state for update to authenticated using (id = 1 and exists (select 1 from public.run_group_members m where m.user_id = (select auth.uid()))) with check (id = 1 and exists (select 1 from public.run_group_members m where m.user_id = (select auth.uid())));
