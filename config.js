// config.js
window.SDV_CONFIG = {
  brandName: "Swing Dance Vegas",
  tagline: "Keeping Vegas swingin’ — vintage dancing, friendly lessons, and Friday-night socials.",
  // Socials you provided:
  instagramUrl: "https://www.instagram.com/swingdance.vegas/",
  facebookUrl: "https://www.facebook.com/SwingDanceVegas",

  // Primary CTA (set to your Link-in-bio / ticketing / signup page)
  primaryCtaText: "Join / Register",
  primaryCtaUrl: "https://solo.to/swingdancevegas", // swap anytime

  // Key “anchor” weekly info (used on homepage + events)
  weeklyAnchor: {
    title: "Friday Night Swing",
    lessonTime: "Classes + social dancing every Friday night",
    // Your social bios mention Friday-night classes + social; update locations as you like. :contentReference[oaicite:1]{index=1}
    locations: [
      { name: "Rhythms Dance Studio", note: "Classes" },
      { name: "Dragon Gate", note: "Social dancing" }
    ],
    detailsUrl: "events.html#friday"
  },

  // Optional: Google Calendar embed (month view)
  // Create a Google Calendar → Settings → “Integrate calendar” → Embed code
  googleCalendarEmbedUrl: "",

  // Theme (edit to match IG vibe)
  theme: {
    // “vintage paper” background + “Vegas neon” accents
    bg: "#0b0d12",
    card: "#121726",
    text: "#e7ecf2",
    muted: "#9aa4b2",
    border: "rgba(255,255,255,.10)",

    // neon accents
    accent: "#ff4fd8",   // hot pink
    accent2: "#2de2ff",  // electric cyan
    accent3: "#ffd166"   // warm gold
  }
};
