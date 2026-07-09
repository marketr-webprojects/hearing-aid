-- Linaw Dinig CMS — full schema. Paste this whole file into the Supabase SQL editor and Run.
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.

-- ============================================================
-- user_profiles: role + per-section permissions for admin users
-- ============================================================
create table if not exists public.user_profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('admin', 'employee')),
  permissions text[] not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists user_profiles_role_idx on public.user_profiles(role);

-- Shared helper to keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_profiles_touch on public.user_profiles;
create trigger user_profiles_touch
before update on public.user_profiles
for each row execute function public.touch_updated_at();

-- Helper to check admin role without triggering RLS recursion
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.user_profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

alter table public.user_profiles enable row level security;

drop policy if exists "profiles_self_read" on public.user_profiles;
create policy "profiles_self_read" on public.user_profiles
  for select using (auth.uid() = user_id);

drop policy if exists "profiles_admin_read" on public.user_profiles;
create policy "profiles_admin_read" on public.user_profiles
  for select using (public.is_admin());

drop policy if exists "profiles_admin_write" on public.user_profiles;
create policy "profiles_admin_write" on public.user_profiles
  for all using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- activity_logs: append-only audit trail for admin actions
-- ============================================================
create table if not exists public.activity_logs (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  user_email text,
  action     text not null check (action in ('create', 'update', 'delete', 'login', 'logout')),
  table_name text not null,
  record_id  text,
  details    text,
  created_at timestamptz not null default now()
);

create index if not exists activity_logs_created_at_idx on public.activity_logs(created_at desc);
create index if not exists activity_logs_user_id_idx    on public.activity_logs(user_id);
create index if not exists activity_logs_table_name_idx on public.activity_logs(table_name);

alter table public.activity_logs enable row level security;

-- Only admins may read logs. Writes happen via service role, so no insert policy needed.
drop policy if exists "logs_admin_read" on public.activity_logs;
create policy "logs_admin_read" on public.activity_logs
  for select using (
    exists (
      select 1 from public.user_profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

-- ============================================================
-- site_settings: single-row store of global company details + shared copy
-- ============================================================
create table if not exists public.site_settings (
  id          integer primary key default 1,
  data        jsonb not null default '{}',
  updated_at  timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into public.site_settings (id, data)
values (1, '{}')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "settings_public_select" on public.site_settings;
create policy "settings_public_select" on public.site_settings
  for select using (true);

drop policy if exists "settings_admin_write" on public.site_settings;
create policy "settings_admin_write" on public.site_settings
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- ============================================================
-- faqs: accordion on home + /patients/faqs (also feeds FAQPage JSON-LD)
-- ============================================================
create table if not exists public.faqs (
  id             uuid primary key default gen_random_uuid(),
  question       text not null,
  answer         text not null,
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists faqs_display_order_idx on public.faqs(display_order);

alter table public.faqs enable row level security;

drop policy if exists "faqs_public_select" on public.faqs;
create policy "faqs_public_select" on public.faqs
  for select using (is_published = true);

drop policy if exists "faqs_admin_select" on public.faqs;
create policy "faqs_admin_select" on public.faqs
  for select using (auth.uid() is not null);

drop policy if exists "faqs_admin_insert" on public.faqs;
create policy "faqs_admin_insert" on public.faqs
  for insert with check (auth.uid() is not null);

drop policy if exists "faqs_admin_update" on public.faqs;
create policy "faqs_admin_update" on public.faqs
  for update using (auth.uid() is not null);

drop policy if exists "faqs_admin_delete" on public.faqs;
create policy "faqs_admin_delete" on public.faqs
  for delete using (auth.uid() is not null);

drop trigger if exists faqs_touch on public.faqs;
create trigger faqs_touch
  before update on public.faqs
  for each row execute function public.touch_updated_at();

-- ============================================================
-- testimonials: patient reviews shown on the home page
-- ============================================================
create table if not exists public.testimonials (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  source         text not null default '',        -- e.g. "Google Review · Tanay"
  quote          text not null,
  rating         integer not null default 5 check (rating between 1 and 5),
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists testimonials_display_order_idx on public.testimonials(display_order);

alter table public.testimonials enable row level security;

drop policy if exists "testimonials_public_select" on public.testimonials;
create policy "testimonials_public_select" on public.testimonials
  for select using (is_published = true);

drop policy if exists "testimonials_admin_select" on public.testimonials;
create policy "testimonials_admin_select" on public.testimonials
  for select using (auth.uid() is not null);

drop policy if exists "testimonials_admin_insert" on public.testimonials;
create policy "testimonials_admin_insert" on public.testimonials
  for insert with check (auth.uid() is not null);

drop policy if exists "testimonials_admin_update" on public.testimonials;
create policy "testimonials_admin_update" on public.testimonials
  for update using (auth.uid() is not null);

drop policy if exists "testimonials_admin_delete" on public.testimonials;
create policy "testimonials_admin_delete" on public.testimonials
  for delete using (auth.uid() is not null);

drop trigger if exists testimonials_touch on public.testimonials;
create trigger testimonials_touch
  before update on public.testimonials
  for each row execute function public.touch_updated_at();

-- ============================================================
-- team_members: clinicians shown on the home page / about pages
-- ============================================================
create table if not exists public.team_members (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  title          text not null default '',
  img            text not null default '',
  creds          text[] not null default '{}',
  fun_fact       text not null default '',
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists team_members_display_order_idx on public.team_members(display_order);

alter table public.team_members enable row level security;

drop policy if exists "team_public_select" on public.team_members;
create policy "team_public_select" on public.team_members
  for select using (is_published = true);

drop policy if exists "team_admin_select" on public.team_members;
create policy "team_admin_select" on public.team_members
  for select using (auth.uid() is not null);

drop policy if exists "team_admin_insert" on public.team_members;
create policy "team_admin_insert" on public.team_members
  for insert with check (auth.uid() is not null);

drop policy if exists "team_admin_update" on public.team_members;
create policy "team_admin_update" on public.team_members
  for update using (auth.uid() is not null);

drop policy if exists "team_admin_delete" on public.team_members;
create policy "team_admin_delete" on public.team_members
  for delete using (auth.uid() is not null);

drop trigger if exists team_members_touch on public.team_members;
create trigger team_members_touch
  before update on public.team_members
  for each row execute function public.touch_updated_at();

-- ============================================================
-- branches: clinic locations (drive /branches/[slug], footer, JSON-LD)
-- ============================================================
create table if not exists public.branches (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  name           text not null,
  short_name     text not null,
  is_main        boolean not null default false,
  address        text not null default '',
  phone          text not null default '',
  phone_href     text not null default '',
  hours          text not null default '',
  opening_hours  text,                              -- machine-readable, e.g. "Mo-Fr 09:00-17:00" (null = by appointment)
  access         text not null default '',
  facebook_label text not null default '',
  facebook_href  text not null default '',
  reviews_href   text,
  image          text not null default '',
  -- Editorial copy + SEO for the branch's own /branches/[slug] page
  place            text not null default '',          -- e.g. "Tanay, Rizal" (blank = derived from name)
  hero_subtitle    text not null default '',
  about            text[] not null default '{}',      -- "About this branch" paragraphs
  seo_title        text not null default '',
  seo_description  text not null default '',
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Adding the branch-page columns to an existing install (safe to re-run).
alter table public.branches add column if not exists place           text not null default '';
alter table public.branches add column if not exists hero_subtitle   text not null default '';
alter table public.branches add column if not exists about           text[] not null default '{}';
alter table public.branches add column if not exists seo_title       text not null default '';
alter table public.branches add column if not exists seo_description text not null default '';

-- Backfill the branch-page copy that used to live in the Next.js source, so an
-- existing install keeps its /branches/[slug] pages. Only fills blank columns,
-- so it never overwrites anything edited in the admin.
update public.branches set
  place = coalesce(nullif(place, ''), v.place),
  hero_subtitle = coalesce(nullif(hero_subtitle, ''), v.hero_subtitle),
  about = case when about = '{}' then v.about else about end,
  seo_description = coalesce(nullif(seo_description, ''), v.seo_description)
from (values
  (
    'tanay',
    'Tanay, Rizal',
    'Our main office — serving Tanay, Baras, Pililla, Morong, Antipolo and the wider Rizal province since June 2021.',
    array[
      $p$The Tanay branch is where Linaw Dinig began in June 2021, and it remains our main office today. You'll find us at the G-Complex along Sampaloc Road in Brgy. Plaza Aldea — with ample parking and a wheelchair-accessible entrance, so getting to your appointment is the easy part.$p$,
      $p$As the main office, Tanay offers our complete range of services: comprehensive hearing evaluations for adults and children, newborn hearing screening, hearing aid counseling and fitting, in-clinic repairs and maintenance, and ongoing follow-up care. Our lead audiologist and Tanay-based audiometrist Rica Roxas — a certified newborn hearing screening personnel — see patients here Monday to Friday.$p$,
      $p$Patients have rated the Tanay branch 4.9 out of 5 on Google. If you're anywhere in Rizal province and searching for a hearing test or hearing aids near you, this is your branch.$p$
    ],
    $p$Visit the Linaw Dinig Hearing Aid Center main office in Tanay, Rizal — hearing tests for adults and children, hearing aid counseling & fitting, repairs and follow-up care. Rated 4.9 on Google.$p$
  ),
  (
    'cebu',
    'Cebu City',
    'Our home in the Visayas — quality hearing care for Cebu City and neighboring communities.',
    array[
      $p$Our Cebu branch brings Linaw Dinig's hearing care to the Visayas. We're located on the 3rd floor of Anchor Lab Medical Center in the Aspac Building along N. Bacalso Avenue, Sambag I — a familiar medical hub that's easy to reach from most of Cebu City. Parking nearby is limited, so commuting or being dropped off is often the easier option; note that the clinic is not wheelchair accessible.$p$,
      $p$The branch is home to audiometrist Hannah Pason, trained in supporting children with special needs and in spotting red flags of developmental delay — so both adult and pediatric patients are in good hands. Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available here Monday to Friday.$p$,
      $p$Cebu patients have given the branch a 5.0 rating on Google. If you're searching for a hearing test or hearing aid center in Cebu City, come visit — no referral needed.$p$
    ],
    $p$Linaw Dinig Hearing Aid Center Cebu — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside Anchor Lab Medical Center on N. Bacalso Avenue, Cebu City. Rated 5.0 on Google.$p$
  ),
  (
    'dasmarinas',
    'Dasmariñas City, Cavite',
    'Hearing care for Cavite — so patients from Dasmariñas, Imus, Bacoor and beyond don''t have to travel far.',
    array[
      $p$Our Dasmariñas branch serves the whole of Cavite, located on the 2nd floor of JaroMed and Diagnostic Center in the GRJ Jaro Building along Aguinaldo Highway, Salitran I. The clinic is wheelchair accessible; parking space is limited, so allow a few extra minutes if you're driving.$p$,
      $p$This branch operates by appointment between 9AM and 5PM — which means no long waits: your time slot is yours. Booking ahead by phone or through our online form guarantees you're seen at the Dasma clinic, not mistakenly listed at another branch.$p$,
      $p$Patients here have rated the branch 5.0 on Google, praising the gentle, clearly explained testing. Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available — if you're in Cavite and searching for a hearing center near you, this is the one.$p$
    ],
    $p$Linaw Dinig Hearing Aid Center Dasma — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside JaroMed & Diagnostic Center on Aguinaldo Highway, Dasmariñas, Cavite. By appointment.$p$
  ),
  (
    'la-union',
    'Rosario, La Union',
    'Bringing quality hearing care to North Luzon — Rosario, the rest of La Union, and neighboring Pangasinan and Baguio.',
    array[
      $p$Our newest branch brings Linaw Dinig to North Luzon. We hold clinic inside Rosario Diagnostic Center along MacArthur Highway in Rosario, La Union — right on the main route, easy to find whether you're coming from the coast or down from Baguio. Parking is limited and wheelchair mobility within the facility is limited, so let us know when booking if you need assistance.$p$,
      $p$The branch is run by audiometrist Jah Estoque — a Registered Midwife with special training in supporting children with special needs, which makes her especially well-suited to newborn hearing screening and pediatric visits. Clinic hours are Monday to Friday, 9AM to 4PM.$p$,
      $p$Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available here, with the full support of our main office behind every visit. If you're in La Union or nearby provinces searching for a hearing test, we'd love to welcome you.$p$
    ],
    $p$Linaw Dinig Hearing Aid Center La Union — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside Rosario Diagnostic Center on MacArthur Highway, Rosario, La Union.$p$
  )
) as v(slug, place, hero_subtitle, about, seo_description)
where public.branches.slug = v.slug;

create index if not exists branches_display_order_idx on public.branches(display_order);

alter table public.branches enable row level security;

drop policy if exists "branches_public_select" on public.branches;
create policy "branches_public_select" on public.branches
  for select using (is_published = true);

drop policy if exists "branches_admin_select" on public.branches;
create policy "branches_admin_select" on public.branches
  for select using (auth.uid() is not null);

drop policy if exists "branches_admin_insert" on public.branches;
create policy "branches_admin_insert" on public.branches
  for insert with check (auth.uid() is not null);

drop policy if exists "branches_admin_update" on public.branches;
create policy "branches_admin_update" on public.branches
  for update using (auth.uid() is not null);

drop policy if exists "branches_admin_delete" on public.branches;
create policy "branches_admin_delete" on public.branches
  for delete using (auth.uid() is not null);

drop trigger if exists branches_touch on public.branches;
create trigger branches_touch
  before update on public.branches
  for each row execute function public.touch_updated_at();

-- ============================================================
-- messages: appointment requests from the /book form
-- Inserts happen via the service-role client in the requestAppointment
-- server action, so no public insert policy is needed.
-- ============================================================
create table if not exists public.messages (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null,
  last_name        text not null,
  phone            text not null,
  email            text not null,
  dob              text not null default '',
  location         text not null default '',        -- preferred clinic
  appointment_type text not null default '',
  preferred_date   text not null default '',
  preferred_time   text not null default '',
  hear_about       text not null default '',
  notes            text,
  status           text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at       timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages(created_at desc);
create index if not exists messages_status_idx     on public.messages(status);

alter table public.messages enable row level security;

drop policy if exists "messages_admin_select" on public.messages;
create policy "messages_admin_select" on public.messages
  for select using (auth.uid() is not null);

drop policy if exists "messages_admin_update" on public.messages;
create policy "messages_admin_update" on public.messages
  for update using (auth.uid() is not null);

drop policy if exists "messages_admin_delete" on public.messages;
create policy "messages_admin_delete" on public.messages
  for delete using (auth.uid() is not null);

-- ============================================================
-- page_content: per-route structured copy overrides
-- Each row holds the structured data object for one route (keyed by path),
-- merged over the in-code defaults by getPageContent(). Empty table = the
-- site renders entirely from code defaults.
-- ============================================================
create table if not exists public.page_content (
  path        text primary key,
  data        jsonb not null default '{}',
  updated_at  timestamptz not null default now()
);

alter table public.page_content enable row level security;

drop policy if exists "page_content_public_select" on public.page_content;
create policy "page_content_public_select" on public.page_content
  for select using (true);

drop policy if exists "page_content_admin_write" on public.page_content;
create policy "page_content_admin_write" on public.page_content
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop trigger if exists page_content_touch on public.page_content;
create trigger page_content_touch
  before update on public.page_content
  for each row execute function public.touch_updated_at();

-- ============================================================
-- storage: one public media bucket for uploaded images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media_auth_insert" on storage.objects;
create policy "media_auth_insert" on storage.objects
  for insert with check (bucket_id = 'media' and auth.uid() is not null);

drop policy if exists "media_auth_update" on storage.objects;
create policy "media_auth_update" on storage.objects
  for update using (bucket_id = 'media' and auth.uid() is not null);

drop policy if exists "media_auth_delete" on storage.objects;
create policy "media_auth_delete" on storage.objects
  for delete using (bucket_id = 'media' and auth.uid() is not null);
