export const brandConfig = {
  "slug": "ultras-store",
  "repo": "ultras-store-malang-landing",
  "brandName": "Ultras Store",
  "monogram": "US",
  "layout": "ultras",
  "category": "Supporter retail and streetwear",
  "address": "Jl. Trunojoyo No.33A, Klojen, Malang",
  "contact": "0819-1108-1987 / 0857-5576-1940",
  "hours": "Daily 10:00-21:30, shipping available",
  "publicLink": "https://linktr.ee/ultrasmlg",
  "instagram": "https://www.instagram.com/ultrasmlg",
  "theme": {
    "bg": "#f5f2eb",
    "ink": "#101510",
    "muted": "#566359",
    "accent": "#008a58",
    "accent2": "#0c1f16",
    "panel": "#ffffff"
  },
  "dna": {
    "visual": "Magazine cover system with oversized type, editorial product rows, and supporter-culture rhythm.",
    "business": "Turn supporter identity into shoppable drops, store visits, and shipping inquiries.",
    "story": "Visitor sees the drop cover, checks stock/size, reads material notes, explores lookbook, then routes to store or WhatsApp.",
    "emotion": "Local pride, matchday confidence, streetwear scarcity.",
    "type": "Editorial serif display paired with compact neo-grotesk commerce UI.",
    "motion": "Slow page-turn image reveals, ticker-like drop details, precise hover underline.",
    "layout": "Campaign magazine plus commerce index, not a product-grid clone.",
    "conversion": "Primary route is drop inquiry; secondary route is store visit and shipping order.",
    "photo": "Black storefront, flat-lay merchandise, matchday street portraits, fabric close-ups.",
    "unique": "It feels like a local supporter publication that happens to sell products."
  },
  "metrics": [
    "Trunojoyo retail route",
    "Shipping available",
    "Limited release drops",
    "Supporter culture focus"
  ],
  "packages": [
    {
      "name": "Graphic Tee",
      "price": "from Rp129k",
      "note": "daily supporter wear"
    },
    {
      "name": "Match Scarf",
      "price": "from Rp99k",
      "note": "matchday identity"
    },
    {
      "name": "Outer Drop",
      "price": "from Rp279k",
      "note": "limited run item"
    }
  ],
  "operations": [
    "Size guide",
    "Material notes",
    "Drop calendar",
    "Shipping info",
    "Limited-stock reminders"
  ],
  "workflow": [
    "Choose drop",
    "Check size",
    "Ask stock via WhatsApp",
    "Confirm delivery or pickup",
    "Share fit photo"
  ],
  "proof": [
    "Business listing confirms address, phone, and operating hours.",
    "Store-visit coverage reinforces football-supporter merchandise positioning.",
    "Instagram and listing support local social proof."
  ],
  "team": [
    "Store crew",
    "Drop curator",
    "Shipping admin"
  ],
  "testimonials": [
    "Barang supporter terasa lebih niat kalau ada lookbook.",
    "Size guide bikin order jarak jauh lebih aman."
  ],
  "faqs": [
    "Is shipping available?",
    "How do limited drops work?",
    "Can I check size before visiting?"
  ],
  "policies": [
    "Stock is limited and confirmed by admin.",
    "Exchange depends on size availability.",
    "Shipping fee follows destination."
  ],
  "sourceLinks": [
    {
      "label": "Ultras Store listing",
      "url": "https://www.semuabis.com/ultras-store-malang-0819-1108-1987"
    },
    {
      "label": "Store visit article",
      "url": "https://www.ceritajersey.com/2021/06/store-visit-ultras-malang.html"
    },
    {
      "label": "Ultras Instagram",
      "url": "https://www.instagram.com/ultrasmlg"
    }
  ]
} as const;

export type BrandConfig = typeof brandConfig;
