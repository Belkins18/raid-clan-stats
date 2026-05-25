alter table public.hydra_user_statistics enable row level security;

drop policy if exists "Public read access for hydra user statistics" on public.hydra_user_statistics;

create policy "Public read access for hydra user statistics"
on public.hydra_user_statistics
for select
to anon, authenticated
using (true);

revoke insert, update, delete on public.hydra_user_statistics from anon, authenticated;
