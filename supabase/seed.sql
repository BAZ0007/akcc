insert into public.site_settings (key, label, value, "group")
values
  ('church_name', 'Church Name', 'Australian Kachin Christian Church', 'general'),
  ('hero_service_time', 'Service Time', 'Sundays at 10:30 AM', 'homepage'),
  ('hero_location', 'Location', 'West Ryde Community Hall, Sydney', 'homepage'),
  ('hero_cta_label', 'Primary CTA Label', 'Plan Your Visit', 'homepage'),
  ('hero_cta_href', 'Primary CTA Link', '/new-here', 'homepage'),
  ('hero_secondary_cta_label', 'Secondary CTA Label', 'Watch Sermons', 'homepage'),
  ('hero_secondary_cta_href', 'Secondary CTA Link', '/sermons', 'homepage'),
  ('footer_tagline', 'Footer Tagline', 'A welcoming Kachin church family growing in Christ across Australia.', 'footer'),
  ('footer_address', 'Footer Address', 'West Ryde Community Hall, Sydney, NSW', 'footer'),
  ('footer_email', 'Footer Email', 'hello@akcc.org.au', 'footer'),
  ('footer_phone', 'Footer Phone', '+61 400 000 000', 'footer')
on conflict (key) do update
set label = excluded.label,
    value = excluded.value,
    "group" = excluded."group";

insert into public.navigation_items (label, href, sort_order, is_visible, location)
values
  ('Home', '/', 1, true, 'header'),
  ('About', '/about', 2, true, 'header'),
  ('Sermons', '/sermons', 3, true, 'header'),
  ('Events', '/events', 4, true, 'header'),
  ('New Here', '/new-here', 5, true, 'header'),
  ('Contact', '/contact', 6, true, 'header'),
  ('About', '/about', 1, true, 'footer'),
  ('Sermons', '/sermons', 2, true, 'footer'),
  ('Events', '/events', 3, true, 'footer'),
  ('Contact', '/contact', 4, true, 'footer')
on conflict do nothing;

insert into public.homepage_sections (
  section_key,
  title,
  subtitle,
  body,
  cta_label,
  cta_href,
  secondary_cta_label,
  secondary_cta_href,
  image_url,
  sort_order,
  is_enabled
)
values
  (
    'hero',
    'A church family rooted in faith, worship, and community.',
    'Welcome to AKCC',
    'Join us each Sunday as we gather to worship Jesus, encourage one another, and serve the Kachin community across Australia.',
    'Plan Your Visit',
    '/new-here',
    'Explore Sermons',
    '/sermons',
    'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1200&q=80',
    1,
    true
  ),
  (
    'community',
    'A welcoming place for every generation.',
    'Life Together',
    'From children and youth to families and elders, AKCC is a home where people grow in faith together and care for one another beyond Sunday gatherings.',
    'Meet Our Church',
    '/about',
    null,
    null,
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    2,
    true
  ),
  (
    'next_steps',
    'Take your next step with us.',
    'New to AKCC',
    'Whether you are exploring faith, looking for a church home, or hoping to connect with our leaders, we would love to hear from you.',
    'I’m New Here',
    '/new-here',
    'Contact Us',
    '/contact',
    null,
    3,
    true
  )
on conflict (section_key) do update
set title = excluded.title,
    subtitle = excluded.subtitle,
    body = excluded.body,
    cta_label = excluded.cta_label,
    cta_href = excluded.cta_href,
    secondary_cta_label = excluded.secondary_cta_label,
    secondary_cta_href = excluded.secondary_cta_href,
    image_url = excluded.image_url,
    sort_order = excluded.sort_order,
    is_enabled = excluded.is_enabled;

insert into public.sermons (title, slug, speaker, date, scripture, summary, thumbnail_url, youtube_url, is_published)
values
  ('Faithful in Every Season', 'faithful-in-every-season', 'Rev. Lahpai Zau', '2026-03-01', 'Psalm 46', 'A message of steady trust in God during change, uncertainty, and transition.', 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', true),
  ('The Beauty of Gospel Community', 'beauty-of-gospel-community', 'Pastor Mung Nau', '2026-02-22', 'Acts 2:42-47', 'How the early church models prayer, generosity, fellowship, and joyful witness for us today.', 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg', 'https://www.youtube.com/watch?v=ysz5S6PUM-U', true),
  ('Hope That Holds', 'hope-that-holds', 'Rev. Gum Ja', '2026-02-15', 'Hebrews 6:13-20', 'A call to anchor our hearts in the promises of God when life feels unstable.', 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', true)
on conflict (slug) do update
set title = excluded.title,
    speaker = excluded.speaker,
    date = excluded.date,
    scripture = excluded.scripture,
    summary = excluded.summary,
    thumbnail_url = excluded.thumbnail_url,
    youtube_url = excluded.youtube_url,
    is_published = excluded.is_published;

insert into public.events (title, slug, description, date, time, location, image_url, rsvp_url, is_published)
values
  ('Youth Worship Night', 'youth-worship-night', 'An evening of worship, testimonies, and prayer for our youth and young adults.', '2026-03-20', '7:00 PM', 'Parramatta Community Centre', 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80', 'https://example.com/rsvp/youth-worship-night', true),
  ('Family Fellowship Lunch', 'family-fellowship-lunch', 'A relaxed lunch after service for families, newcomers, and ministry leaders to connect.', '2026-03-29', '12:30 PM', 'Church Hall', 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80', null, true),
  ('Prayer and Fasting Morning', 'prayer-and-fasting-morning', 'A focused morning of worship and prayer for the church, our city, and mission partners.', '2026-04-04', '9:00 AM', 'AKCC Prayer Room', null, null, true)
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    date = excluded.date,
    time = excluded.time,
    location = excluded.location,
    image_url = excluded.image_url,
    rsvp_url = excluded.rsvp_url,
    is_published = excluded.is_published;

insert into public.announcements (title, body, cta_label, cta_href, publish_date, expires_at, is_published)
values
  ('Volunteer Sign-ups Open', 'We are welcoming more volunteers for hospitality, worship support, kids ministry, and Sunday setup teams.', 'Get Involved', '/contact', '2026-03-05', null, true),
  ('Prayer Requests Welcome', 'If you need prayer, our pastoral team would be honored to stand with you throughout the week.', 'Share a Request', '/new-here', '2026-03-08', null, true)
on conflict do nothing;

insert into public.leaders (name, role_title, bio, image_url, email, phone, sort_order, is_published)
values
  ('Rev. Lahpai Zau', 'Senior Pastor', 'Serving AKCC with a heart for gospel preaching, pastoral care, and intergenerational discipleship.', null, 'pastor@akcc.org.au', null, 1, true),
  ('Maran Htoi', 'Community Care Coordinator', 'Helps newcomers connect into fellowship, prayer, and practical support across the church family.', null, 'care@akcc.org.au', null, 2, true)
on conflict do nothing;

