-- Linaw Dinig CMS — seed data. Populates branches, team_members, testimonials
-- and faqs with the site's current in-code defaults (src/lib/company.ts,
-- team.ts, testimonials.ts, faqs.ts) so they can be edited from the admin.
--
-- Run AFTER all.sql. Safe to re-run:
--   * branches upsert on slug (no duplicates)
--   * team_members / testimonials / faqs only insert when their table is empty,
--     so re-running never duplicates rows or clobbers admin edits.
--
-- Note: the site already renders these exact values as fallbacks when the
-- tables are empty, so seeding changes nothing visually — it just makes the
-- content show up (and be editable) in the admin.

-- ============================================================
-- branches
-- ============================================================
insert into public.branches
  (slug, name, short_name, is_main, address, phone, phone_href, hours, opening_hours,
   access, facebook_label, facebook_href, reviews_href, image, display_order, is_published)
values
  (
    'tanay',
    'Tanay, Rizal (Main Office)',
    'Tanay',
    true,
    '98 Unit B G-Complex Sampaloc Rd., Brgy. Plaza Aldea, Tanay, Rizal 1980',
    '0917 553 2999',
    'tel:+639175532999',
    'Monday to Friday, 9AM – 5PM',
    'Mo-Fr 09:00-17:00',
    'Ample parking space and wheelchair accessible.',
    'Linaw Dinig Hearing Aid Center – Tanay',
    'https://web.facebook.com/linawdinigtanay/',
    'https://tinyurl.com/Tanay-Reviews',
    '/assets/branch-tanay.webp',
    0,
    true
  ),
  (
    'cebu',
    'Cebu City, Cebu',
    'Cebu',
    false,
    '3rd Flr. Anchor Lab Medical Center, Aspac Bldg., N. Bacalso Ave., Sambag I, Cebu City, Cebu',
    '0917 851 8899',
    'tel:+639178518899',
    'Monday to Friday, 9AM – 5PM',
    'Mo-Fr 09:00-17:00',
    'Limited parking space. Not accessible by wheelchair.',
    'Linaw Dinig Hearing Aid Center – Cebu',
    'https://web.facebook.com/linawdinigcebu/',
    'https://tinyurl.com/Cebu-Review',
    '/assets/branch-cebu.webp',
    1,
    true
  ),
  (
    'dasmarinas',
    'Dasmariñas City, Cavite',
    'Dasma',
    false,
    '2nd Flr. JaroMed and Diagnostic Center, GRJ Jaro Bldg., Aguinaldo Highway, Salitran I, Dasmariñas City, Cavite',
    '0917 770 0288',
    'tel:+639177700288',
    'By Appointment, 9AM – 5PM',
    null, -- by appointment: no machine-readable hours
    'Limited parking space. Accessible by wheelchair.',
    'Linaw Dinig Hearing Aid Center – Dasma',
    'https://web.facebook.com/linawdinigdasma/',
    'https://tinyurl.com/DasmaGoogleReview',
    '/assets/branch-dasmarinas.webp',
    2,
    true
  ),
  (
    'la-union',
    'Rosario, La Union',
    'La Union',
    false,
    'Rosario Diagnostic Center, MacArthur Highway, Rosario, La Union',
    '0917 620 9898',
    'tel:+639176209898',
    'Monday to Friday, 9AM – 4PM',
    'Mo-Fr 09:00-16:00',
    'Limited parking space. Limited mobility for wheelchair users.',
    'Linaw Dinig Hearing Aid Center – La Union',
    'https://web.facebook.com/linawdiniglaunion/',
    null,
    '/assets/branch-rosario.webp',
    3,
    true
  )
on conflict (slug) do nothing;

-- ============================================================
-- team_members (only seeds when the table is empty)
-- ============================================================
insert into public.team_members (name, title, img, creds, fun_fact, display_order, is_published)
select * from (
  values
    (
      'Jelo Gibas',
      'Lead Audiologist',
      '/assets/team/JeloGibas.webp',
      array[
        'Registered Nurse',
        'Certified Newborn Hearing Screening Personnel',
        'Graduate of Master in Clinical Audiology from University of Santo Tomas, Manila',
        'Holder of Diploma in Pediatric Audiology from School of Advanced Education, Research and Accreditation, Spain',
        'Graduate of Bachelor of Science in Nursing from Far Eastern University, Manila'
      ],
      'Unflappable',
      0,
      true
    ),
    (
      'Rica Roxas',
      'Audiometrist (Tanay)',
      '/assets/team/RicaRoxas.webp',
      array[
        'Certified Newborn Hearing Screening Personnel',
        'With special training in Practical Home Behavior Management for Children with Special Needs and Identifying Red Flags of Developmental Delay',
        'Certificate in Medical Office Administration',
        'Certificate in Occupational First Aid Training and BLS CPR w/ AED'
      ],
      'Animal Lover',
      1,
      true
    ),
    (
      'Hannah Pason',
      'Audiometrist (Cebu)',
      '/assets/team/HannahPason.webp',
      array[
        'With special training in Practical Home Behavior Management for Children with Special Needs and Identifying Red Flags of Developmental Delay',
        'Certificate in Medical Office Administration',
        'Certificate in Occupational First Aid Training and BLS CPR w/ AED'
      ],
      'Jokester',
      2,
      true
    ),
    (
      'Jah Estoque',
      'Audiometrist (La Union)',
      '/assets/team/JahEstoque.webp',
      array[
        'Registered Midwife',
        'With special training in Practical Home Behavior Management for Children with Special Needs',
        'Certificate in Medical Office Administration'
      ],
      'Comical',
      3,
      true
    )
) as seed(name, title, img, creds, fun_fact, display_order, is_published)
where not exists (select 1 from public.team_members);

-- ============================================================
-- testimonials (only seeds when the table is empty)
-- ============================================================
insert into public.testimonials (name, source, quote, rating, display_order, is_published)
select * from (
  values
    (
      'Edmund Cuntapay',
      'Google Review · Tanay',
      'Communication was clear and timely, expectations were well-defined, and their professionalism made the process smooth and efficient.',
      5,
      0,
      true
    ),
    (
      'M. WR',
      'Google Review · Dasma',
      'Highly recommended. Dr. Jelo Gibas is very professional and kind Clinical Audiologist. He is very gentle with his patients and clearly explained things you need to know in doing the hearing test.',
      5,
      1,
      true
    ),
    (
      'Ferniepe Layon',
      'Google Review · Cebu',
      'Very approachable, and accomodated. Thank you Linaw Dinig Hearing',
      5,
      2,
      true
    )
) as seed(name, source, quote, rating, display_order, is_published)
where not exists (select 1 from public.testimonials);

-- ============================================================
-- faqs (only seeds when the table is empty)
-- ============================================================
insert into public.faqs (question, answer, display_order, is_published)
select * from (
  values
    (
      'How much does a hearing test cost?',
      'Hearing test prices can range from 550 pesos up to 8,000 pesos depending on the required hearing test procedure. Message us to know the exact test price.',
      0,
      true
    ),
    (
      'How much do hearing aids cost, and are there payment options?',
      'Hearing aid price varies depending on the following factors — degree of hearing loss, technology level, visibility when wearing the devices, and connectivity. Send us a copy of your latest hearing test result so we can quote you accordingly. Several flexible payment options are available such as cash, GCash, bank transfer or deposit, debit card, and credit card. We accept major cards such as Mastercard and Visa.',
      1,
      true
    ),
    (
      'What happens at a hearing test?',
      'We start with a friendly chat about your hearing concerns, take a look in your ears, then run a series of comfortable hearing tests. Your audiologist explains the results in plain language and discusses your options.',
      2,
      true
    ),
    (
      'How long does a hearing aid fitting take?',
      'Typically 60–90 minutes. We fit the devices, fine-tune them to your hearing profile, show you how to use and care for them, and answer all your questions.',
      3,
      true
    ),
    (
      'Which hearing aid brand is best?',
      'There is no single ''best'' brand. The right device depends on the degree of your hearing, lifestyle, and budget. As an independent clinic we recommend what truly suits you.',
      4,
      true
    ),
    (
      'Can I trial a hearing aid before buying?',
      'Yes. We offer a no-pressure, in-clinic trial session so you can experience the difference in your everyday life before committing.',
      5,
      true
    ),
    (
      'Do you repair hearing aids from other clinics?',
      'Yes, we service the same brands that we offer — even if you didn''t buy them from us.',
      6,
      true
    ),
    (
      'How long do hearing aids last?',
      'Most modern hearing aids last 3–5 years with proper care. We provide minor cleaning, servicing, and re-programming for the life of your device. All hearing aid purchases come with a 1-year warranty against manufacturing defects.',
      7,
      true
    ),
    (
      'Do you test children''s hearing?',
      'Yes. We provide comprehensive pediatric hearing evaluation — including newborn hearing screening, play audiometry, ABR/BAER and ASSR — because early detection and intervention give every child the best start.',
      8,
      true
    ),
    (
      'Do I need a referral to book an appointment?',
      'No referral needed. You''re welcome to book directly with us.',
      9,
      true
    )
) as seed(question, answer, display_order, is_published)
where not exists (select 1 from public.faqs);
