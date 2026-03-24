/**
 * CMS Content Schema — all editable content with default values.
 * Admin overrides stored in localStorage: 'alhamra_cms_v1'
 */
export interface CMSContent {
  [key: string]: string;
}

export const DEFAULT_CONTENT: CMSContent = {
  // Hero
  "hero.eyebrow":        "Kuwait City · 412 Metres · Est. 2011",
  "hero.headline":       "Al Hamra",
  "hero.subheadline":    "Business Tower",
  "hero.tagline":        "Kuwait's tallest building. The world's tallest sculpted concrete tower. An architectural landmark designed by Skidmore, Owings & Merrill.",
  "hero.cta.primary":    "Leasing Inquiries",
  "hero.cta.secondary":  "The Tower",

  // About section
  "about.eyebrow":       "About the Tower",
  "about.headline1":     "Carved from",
  "about.headline2":     "the desert sun.",
  "about.body":          "Designed by Skidmore, Owings & Merrill, Al Hamra Business Tower's form emerged from a single architectural gesture — removing a quarter of each floor, spiralling upward from west to east. The south facade becomes a monolithic Jura limestone wall: the world's tallest sculpted concrete tower, rising 412 metres above Kuwait City.",
  "about.cta":           "The Design Story",

  // Stats
  "stats.eyebrow":       "By the Numbers",
  "stats.tagline":       "The standard for Gulf commercial architecture.",
  "stats.1.value":       "412",  "stats.1.suffix": "m",   "stats.1.label": "Height",       "stats.1.desc": "Tallest building in Kuwait. 40th tallest globally.",
  "stats.2.value":       "80",   "stats.2.suffix": "",    "stats.2.label": "Floors",        "stats.2.desc": "Above-ground levels of premium commercial space.",
  "stats.3.value":       "43",   "stats.3.suffix": "",    "stats.3.label": "Elevators",     "stats.3.desc": "Including destination dispatch system.",
  "stats.4.value":       "2000", "stats.4.suffix": "+",   "stats.4.label": "Parking Spaces","stats.4.desc": "Across 11 below-grade levels.",
  "stats.quote":         '"Named one of the Best Inventions of 2011 — Time Magazine."',
  "stats.quote.cta":     "Awards & Recognition",

  // Inside / Lobby section
  "inside.eyebrow":      "Inside Al Hamra",
  "inside.headline1":    "A lobby",
  "inside.headline2":    "that sets the tone.",
  "inside.body":         "The 24-metre-high lobby is a column-free space made possible by a lamella steel roof structure. No pillar interrupts the view from the entrance to the Arabian Gulf.",
  "inside.cta":          "The Workplace Experience",
  "inside.a1.title":     "Sky Lounge",       "inside.a1.desc": "351m. Kuwait's premier dining at the summit.",
  "inside.a2.title":     "Health Club",      "inside.a2.desc": "State-of-the-art fitness facilities for tenants.",
  "inside.a3.title":     "Sky Corridors",    "inside.a3.desc": "Glass-enclosed walkways with panoramic views.",
  "inside.a4.title":     "Smart Building",   "inside.a4.desc": "Honeywell-certified. 100% power redundancy.",

  // Business section
  "business.eyebrow":    "The Business Address",
  "business.headline1":  "Where Kuwait's",
  "business.headline2":  "leadership works.",
  "business.cta":        "Explore Workspaces",
  "business.c1.label":   "Grade-A Offices",  "business.c1.title": "Standard & Executive Floors","business.c1.desc": "2,300 m² per floor. Floor-to-ceiling glass. Arabian Gulf views.","business.c1.meta": "Floors 6–73",
  "business.c2.label":   "The Summit",       "business.c2.title": "Executive Floors 74 & 75",   "business.c2.desc": "The highest business address in Kuwait.","business.c2.meta": "327–338m",
  "business.c3.label":   "Infrastructure",   "business.c3.title": "Smart Building Systems",      "business.c3.desc": "Fibre optic backbone, 5 substations, 100% power redundancy.","business.c3.meta": "LEED Compliant",

  // Night / address section
  "night.eyebrow":       "The Address",
  "night.headline1":     "The address",
  "night.headline2":     "that defines",
  "night.headline3":     "Kuwait City.",
  "night.body":          "Al Sharq District, Kuwait City. Adjacent to the Arabian Gulf waterfront, minutes from the diplomatic quarter and Kuwait's central government offices.",
  "night.cta":           "Enquire About Availability",

  // Leasing CTA
  "cta.eyebrow":         "Available Now",
  "cta.headline1":       "Secure your position",
  "cta.headline2":       "above Kuwait City.",
  "cta.body":            "Standard office floors from 2,300 m². Executive suites on floors 74–75. Speak with our leasing team — response within 24 hours.",
  "cta.primary":         "View Available Spaces",
  "cta.secondary":       "Contact Leasing Team",
  "cta.phone":           "+965 222 70 222",
  "cta.phone.label":     "WhatsApp · Leasing Office",

  // Footer
  "footer.tagline":      "Kuwait's vertical city — the tallest building in the Gulf.",
  "footer.phone1.label": "Corporate",    "footer.phone1.value": "+965 182 9000",
  "footer.phone2.label": "Leasing",      "footer.phone2.value": "+965 222 70 222",
  "footer.phone3.label": "24/7 Helpdesk","footer.phone3.value": "+965 222 33 043",
  "footer.copyright":    "© 2025 Al Hamra Real Estate Company K.S.C. All rights reserved.",
};

export const STORAGE_KEY = "alhamra_cms_v1";
export const ADMIN_PASS  = "alhamra2025";   // change via /admin settings

// ── Tower Overview page ─────────────────────────────────────
export const TOWER_CONTENT: CMSContent = {
  "tower.eyebrow":        "Al Hamra Tower · Kuwait City · 412m",
  "tower.headline":       "The Tower",
  "tower.intro":          "Kuwait's tallest building. The world's tallest sculpted concrete tower. A landmark defined by removal — a quarter of each floor carved away, spiralling upward like the bisht it was born from.",
  "tower.identity.label": "Identity",
  "tower.identity.h":     "A landmark carved from conviction.",
  "tower.identity.p1":    "Designed by Skidmore, Owings & Merrill, Al Hamra Tower stands as Kuwait's most significant architectural achievement. At 412 metres, it is the tallest building in Kuwait and the tallest sculpted concrete tower ever constructed.",
  "tower.identity.p2":    "Its form emerged from a single architectural gesture — removing a quarter of each floor plate from the south side, shifting from west to east as the tower rises. The result: a monolithic Jura limestone wall facing the desert sun, framed by graceful glass facades that capture the Gulf and the city skyline.",
  "tower.quote":          '"The purity of its form, expressed by a simple operation of removal, makes the tower a timeless, elegant marker in the heart of Kuwait City."',
  "tower.quote.attr":     "Skidmore, Owings & Merrill — Project Description",
  "tower.explore.label":  "Explore the Tower",
  "tower.explore.sub":    "Every story begins here.",
};

// ── Business pages ──────────────────────────────────────────
export const BUSINESS_CONTENT: CMSContent = {
  // WorkplaceExperience
  "wp.eyebrow":   "Business · Workplace Experience",
  "wp.headline":  "Where Kuwait's leaders work.",
  "wp.env.label": "The Environment",
  "wp.env.h":     "Infrastructure built for enterprise excellence.",
  "wp.env.p1":    "Al Hamra Tower hosts Kuwait's leading corporations, government ministries, and international embassies. At 92% occupancy, this is not just an office building — it is Kuwait's most important business community.",
  "wp.env.p2":    "From the column-free floor plates to the 24-metre lamella lobby, every decision was made to create an environment where serious work happens.",
  "wp.env.cta":   "View Office Configurations",
  "wp.p1.n": "01", "wp.p1.title": "Premium Office Floors",  "wp.p1.body": "2,300 m² per floor. Column-free layouts with 3.2m ceiling heights and floor-to-ceiling glass. Gulf views from every direction.",
  "wp.p2.n": "02", "wp.p2.title": "Sky Lounge & Corridors", "wp.p2.body": "Glass-enclosed sky corridors with panoramic views. The Sky Lounge at 351m is Kuwait's highest dining destination.",
  "wp.p3.n": "03", "wp.p3.title": "Smart Infrastructure",   "wp.p3.body": "Honeywell-certified building automation. Fibre optic backbone, 5 substations, 100% power redundancy. Zero tolerance for downtime.",
  "wp.p4.n": "04", "wp.p4.title": "Managed Services",       "wp.p4.body": "World-class facilities management 24/7. Concierge, security, maintenance — everything handled so your team can focus on work.",
  "wp.stats.1.v": "92%",  "wp.stats.1.l": "Occupancy Rate",  "wp.stats.1.d": "Consistently in-demand",
  "wp.stats.2.v": "120+", "wp.stats.2.l": "Tenants",         "wp.stats.2.d": "Embassies, ministries, multinationals",
  "wp.stats.3.v": "24/7", "wp.stats.3.l": "Operations",      "wp.stats.3.d": "Round-the-clock building services",
  "wp.addr.label": "The Address",
  "wp.addr.h":     "A global business address in Kuwait's heart.",
  "wp.addr.body":  "Al Sharq District. Adjacent to the diplomatic quarter and government institutions. Minutes from Kuwait International Airport. The location is as deliberate as the architecture.",

  // OfficeSpaces
  "os.eyebrow":   "Business · Office Spaces",
  "os.headline":  "Kuwait's finest offices.",
  "os.spec.label":"Floor Specifications",
  "os.spec.h":    "Every floor plate designed for performance.",
  "os.c1.n": "01", "os.c1.title": "Executive Suite",          "os.c1.size": "250 – 500 m²",     "os.c1.floors": "Select floors",   "os.c1.desc": "Corner positions with panoramic Gulf views. Private reception area and executive amenities.",
  "os.c2.n": "02", "os.c2.title": "Full Floor Headquarters",  "os.c2.size": "1,200 – 2,300 m²", "os.c2.floors": "Floors 6 – 73",   "os.c2.desc": "Entire floor plates with dedicated elevator lobbies. 360° views of Kuwait City and the Gulf.",
  "os.c3.n": "03", "os.c3.title": "Executive Floors 74 & 75","os.c3.size": "By arrangement",    "os.c3.floors": "327 – 338m",      "os.c3.desc": "The highest business address in Kuwait. Reserved for organisations that lead.",
  "os.c4.n": "04", "os.c4.title": "Multi-Floor Campus",       "os.c4.size": "3,000+ m²",        "os.c4.floors": "Contiguous blocks","os.c4.desc": "Contiguous multi-floor configurations with internal connecting staircases.",

  // VerticalTransportation
  "vt.eyebrow":   "Business · Vertical Transportation",
  "vt.headline":  "43 elevators. 80 floors. Zero waiting.",
  "vt.sys.label": "The System",
  "vt.sys.h":     "Designed around destination dispatch.",
  "vt.sys.body":  "Al Hamra Tower's destination dispatch system groups passengers travelling to adjacent floors into the same car — eliminating unnecessary stops and reducing average wait times to under 30 seconds during peak hours.",
  "vt.zones.label": "Elevator Zones",
  "vt.zones.h":     "Six zones across 80 floors.",

  // Connectivity
  "cx.eyebrow":   "Business · Connectivity",
  "cx.headline":  "Zero tolerance for downtime.",
  "cx.infra.label":"Technical Infrastructure",
  "cx.infra.h":   "Built for the demands of modern business.",
  "cx.infra.body":"Al Hamra Tower's technical infrastructure was engineered to meet the requirements of Kuwait's most demanding organisations — government institutions, financial services firms, and international corporations that cannot afford interruption.",
};

// ── Leasing pages ───────────────────────────────────────────
export const LEASING_CONTENT: CMSContent = {
  // Opportunities
  "lo.eyebrow":      "Leasing · Available Spaces",
  "lo.headline":     "Your office above Kuwait City.",
  "lo.why.label":    "Why Al Hamra",
  "lo.why.h":        "The address that signals seriousness.",
  "lo.types.label":  "Space Configurations",
  "lo.types.h":      "Every scale of ambition.",
  "lo.begin.h":      "Begin the conversation.",
  "lo.begin.body":   "Our leasing team responds within 24 hours. Provide your requirements and we will prepare a tailored proposal.",
  "lo.begin.cta":    "Submit an Inquiry →",
  "lo.begin.phone":  "+965 222 70 222",

  // Contact
  "lc.eyebrow":      "Leasing · Contact",
  "lc.headline":     "We are here.",
  "lc.touch.label":  "Get in Touch",
  "lc.touch.h":      "Every inquiry deserves a direct response.",
  "lc.address.label":"Address",
  "lc.address.line1":"Al Hamra Business Tower",
  "lc.address.line2":"Al Sharq, Block 8",
  "lc.address.line3":"Jaber Al Mubarak Street",
  "lc.address.line4":"Kuwait City, Kuwait",
  "lc.address.po":   "P.O. Box 83 Safat · 13001 Kuwait",
  "lc.map.label":    "Find Us",
  "lc.map.h1":       "Al Sharq District,",
  "lc.map.h2":       "Kuwait City.",
  "lc.map.body":     "Located at the intersection of Jaber Al Mubarak Street and Al Shuhada'a — the heart of Kuwait City's financial district, five minutes from Kuwait Towers.",
  "lc.map.cta":      "Open in Google Maps →",
};
