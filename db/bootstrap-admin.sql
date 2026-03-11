-- Replace these placeholder values after creating an auth user in Supabase.
-- Then run this in the Supabase SQL editor or as part of your admin bootstrap workflow.

insert into public.roles (user_id, role)
values ('YOUR_AUTH_USER_UUID', 'admin')
on conflict (user_id, role) do nothing;
