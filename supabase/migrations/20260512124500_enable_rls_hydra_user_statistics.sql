alter table public.hydra_statistics enable row level security;
alter table public.hydra_user_statistics enable row level security;

drop policy if exists "Public read access for hydra statistics" on public.hydra_statistics;
drop policy if exists "Public read access for hydra user statistics" on public.hydra_user_statistics;

create policy "Public read access for hydra statistics"
on public.hydra_statistics
for select
to anon, authenticated
using (true);

create policy "Public read access for hydra user statistics"
on public.hydra_user_statistics
for select
to anon, authenticated
using (true);

grant select on public.hydra_statistics to anon, authenticated;
grant select on public.hydra_user_statistics to anon, authenticated;

revoke insert, update, delete on public.hydra_statistics from anon, authenticated;
revoke insert, update, delete on public.hydra_user_statistics from anon, authenticated;
