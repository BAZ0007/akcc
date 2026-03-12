insert into public.site_settings (key, label, value, "group")
values
  ('church_name', 'Church Name', 'Australian Kachin Christian Church', 'general'),
  ('meta_default_title', 'Default Meta Title', 'AKCC | Australian Kachin Christian Church', 'seo'),
  ('meta_default_description', 'Default Meta Description', 'Australian Kachin Christian Church welcomes people of all ages to worship, grow in faith, and find community.', 'seo'),
  ('header_brand_label', 'Header Brand Label', 'Australian Kachin', 'header'),
  ('header_secondary_cta_label', 'Header Secondary CTA Label', 'Latest Message', 'header'),
  ('header_secondary_cta_href', 'Header Secondary CTA Link', '/sermons', 'header'),
  ('header_primary_cta_label', 'Header Primary CTA Label', 'Plan a Visit', 'header'),
  ('header_primary_cta_href', 'Header Primary CTA Link', '/new-here', 'header'),
  ('hero_service_time_label', 'Homepage Service Time Label', 'Service Time', 'homepage'),
  ('hero_service_time', 'Service Time', 'Sundays at 10:30 AM', 'homepage'),
  ('hero_location_label', 'Homepage Location Label', 'Location', 'homepage'),
  ('hero_location', 'Location', 'West Ryde Community Hall, Sydney', 'homepage'),
  ('hero_cta_label', 'Primary CTA Label', 'Plan Your Visit', 'homepage'),
  ('hero_cta_href', 'Primary CTA Link', '/new-here', 'homepage'),
  ('hero_secondary_cta_label', 'Secondary CTA Label', 'Watch Sermons', 'homepage'),
  ('hero_secondary_cta_href', 'Secondary CTA Link', '/sermons', 'homepage'),
  ('footer_brand_label', 'Footer Brand Label', 'AKCC', 'footer'),
  ('footer_navigation_heading', 'Footer Navigation Heading', 'Navigate', 'footer'),
  ('footer_contact_heading', 'Footer Contact Heading', 'Contact', 'footer'),
  ('footer_tagline', 'Footer Tagline', 'A welcoming Kachin church family growing in Christ across Australia.', 'footer'),
  ('footer_address', 'Footer Address', 'West Ryde Community Hall, Sydney, NSW', 'footer'),
  ('footer_email', 'Footer Email', 'hello@akcc.org.au', 'footer'),
  ('footer_phone', 'Footer Phone', '+61 400 000 000', 'footer'),
  ('contact_address_label', 'Contact Address Label', 'Address', 'contact'),
  ('contact_email_label', 'Contact Email Label', 'Email', 'contact'),
  ('contact_phone_label', 'Contact Phone Label', 'Phone', 'contact'),
  ('contact_service_label', 'Contact Service Label', 'Sunday Service', 'contact')
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
    'I''m New Here',
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

insert into public.page_sections (
  page_key,
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
  ('home', 'welcome_card_expect', 'What to expect', null, 'Warm worship, biblical teaching, prayer, and a welcoming church family that makes space for people of every age and stage.', null, null, null, null, null, 1, true),
  ('home', 'welcome_card_belong', 'Who it''s for', null, 'Families, students, working professionals, elders, newcomers, and anyone exploring Christian faith.', null, null, null, null, null, 2, true),
  ('home', 'sermons_intro', 'Recent teaching to encourage your faith.', 'Latest Sermons', 'Watch recent messages, revisit Sunday teaching, and share sermons with family and friends.', null, null, null, null, null, 3, true),
  ('home', 'events_intro', 'Gather, grow, and serve together.', 'Upcoming Events', 'Church life extends beyond Sunday. Stay connected through prayer gatherings, fellowship, and ministry events.', null, null, null, null, null, 4, true),
  ('home', 'leaders_intro', 'Meet the people who help shepherd AKCC.', 'Leadership', 'Our leaders are committed to pastoral care, prayer, discipleship, and building a church family centered on Christ.', null, null, null, null, null, 5, true),
  ('about', 'meta', 'About AKCC', null, 'Learn about Australian Kachin Christian Church, our mission, leadership, and church family in Sydney.', null, null, null, null, null, 1, true),
  ('about', 'hero', 'A church home shaped by worship, scripture, and loving community.', 'About AKCC', 'AKCC exists to glorify God, nurture Kachin believers in Australia, and warmly welcome new people into the life of Christ-centered community.', null, null, null, null, null, 2, true),
  ('about', 'mission', 'Our Mission', null, 'To make disciples of Jesus Christ through worship, biblical teaching, prayer, pastoral care, and service.', null, null, null, null, null, 3, true),
  ('about', 'heart', 'Our Heart', null, 'We want every person who walks through our doors to feel seen, welcomed, and invited into genuine community.', null, null, null, null, null, 4, true),
  ('about', 'future', 'Our Future', null, 'We are building a sustainable ministry foundation for the next generation, with strong pastoral care and digital reach.', null, null, null, null, null, 5, true),
  ('about', 'leadership_intro', 'People serving with faithfulness and care.', 'Leadership Team', 'AKCC''s leaders help guide worship, discipleship, community support, and church-wide ministry rhythms.', null, null, null, null, null, 6, true),
  ('sermons', 'meta', 'Sermons', null, 'Watch recent AKCC sermons, replay Sunday messages, and share YouTube-based preaching with family and friends.', null, null, null, null, null, 1, true),
  ('sermons', 'hero', 'Watch recent preaching and revisit messages anytime.', 'Sermons', 'AKCC sermons are published with YouTube embeds so members and visitors can stay connected throughout the week.', null, null, null, null, null, 2, true),
  ('sermons', 'featured', 'Featured Sermon', null, 'Highlighted message from the latest Sunday gathering.', null, null, null, null, null, 3, true),
  ('sermons', 'library', 'Browse the latest messages.', 'Sermon Library', 'Explore the full sermon archive and revisit messages at your own pace.', null, null, null, null, null, 4, true),
  ('events', 'meta', 'Events', null, 'See upcoming AKCC events, church gatherings, ministry moments, and RSVP opportunities.', null, null, null, null, null, 1, true),
  ('events', 'hero', 'Stay connected through worship, fellowship, and ministry life.', 'Events', 'From family gatherings to prayer nights, our events help church life feel relational, intentional, and full of welcome.', null, null, null, null, null, 2, true),
  ('events', 'listing_intro', 'What''s happening soon at AKCC.', 'Upcoming', 'Browse upcoming gatherings and RSVP where needed.', null, null, null, null, null, 3, true),
  ('contact', 'meta', 'Contact', null, 'Contact AKCC for prayer, pastoral care, visit questions, or general church enquiries.', null, null, null, null, null, 1, true),
  ('contact', 'hero', 'We would love to hear from you.', 'Contact', 'Reach out with questions, prayer needs, pastoral care requests, or anything else you''d like to share with AKCC.', null, null, null, null, null, 2, true),
  ('contact', 'contact_card', 'Visit or Contact', null, 'You can use the form to send general questions, prayer requests, pastoral care needs, or follow-up messages to the AKCC team.', null, null, null, null, null, 3, true),
  ('new-here', 'meta', 'New Here', null, 'Plan your first visit to AKCC, ask questions, and let our church family welcome you well.', null, null, null, null, null, 1, true),
  ('new-here', 'hero', 'Planning your first visit? We would love to welcome you.', 'New Here', 'Whether you''re exploring faith or looking for a church family, AKCC is a warm place to worship, connect, and belong.', null, null, null, null, null, 2, true),
  ('new-here', 'visit_card', 'What to Expect', null, 'Expect heartfelt worship, clear Bible teaching, prayer, and a friendly church family ready to help you settle in.

You can use this form to let us know you''re coming, ask questions, or share how we can help make your first visit comfortable.

Our leaders can also connect you to small groups, children''s ministry, youth gatherings, and serving opportunities.', null, null, null, null, null, 3, true)
on conflict (page_key, section_key) do update
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
