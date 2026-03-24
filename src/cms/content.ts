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
