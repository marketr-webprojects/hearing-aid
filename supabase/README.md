# Supabase setup — Linaw Dinig CMS

1. Create a project at https://supabase.com/dashboard.
2. Open **SQL Editor → New query**, paste the whole of `all.sql`, and **Run**.
   It is idempotent — safe to re-run.
3. Copy **Project Settings → API** values into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable key)
   - `SUPABASE_SERVICE_ROLE_KEY` (secret key)
4. Create the first admin user: **Authentication → Users → Add user**
   (email + password, tick auto-confirm), copy the user's UUID, then run:

   ```sql
   insert into public.user_profiles (user_id, role)
   values ('PASTE-USER-UUID-HERE', 'admin')
   on conflict (user_id) do update set role = 'admin';
   ```

5. `npm run dev` → sign in at `/admin/login`.

Tables: `user_profiles`, `activity_logs`, `site_settings`, `faqs`,
`testimonials`, `team_members`, `branches`, `messages`, `page_content`,
plus the public `media` storage bucket.

The public site always renders from in-code defaults until content is
edited in the admin — an empty database is fine.
