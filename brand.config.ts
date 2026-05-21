export const brandConfig = {
  "slug": "ultras-store",
  "repo": "ultras-store-malang-landing",
  "brandName": "Ultras Store",
  "monogram": "US",
  "category": "Retail fashion and supporter merchandise",
  "location": "Klojen retail route",
  "address": "Jl. Trunojoyo No.33A, Klojen, Malang",
  "contact": "0819-1108-1987 / 0857-5576-1940",
  "publicLink": "https://linktr.ee/ultrasmlg",
  "instagram": "https://www.instagram.com/ultrasmlg",
  "theme": {
    "bg": "#06120d",
    "accent": "#009b63",
    "accent2": "#dfffe8",
    "paper": "#f8fff8"
  },
  "nav": [
    "Drops",
    "Merch",
    "Lookbook",
    "Store"
  ],
  "hero": {
    "eyebrow": "Local apparel and supporter culture",
    "title": "Streetwear drops with local pride on the front row.",
    "body": "An editorial retail page for product drops, supporter merchandise, and store visits. Built for ads that need a sharper destination than a generic storefront.",
    "cta": "Explore Drops"
  },
  "sections": [
    {
      "id": "drops",
      "kicker": "Product Drops",
      "title": "Launch limited pieces with a campaign-ready layout.",
      "items": [
        "New arrivals",
        "Limited release",
        "Drop reminders"
      ]
    },
    {
      "id": "merch",
      "kicker": "Supporter Merchandise",
      "title": "Merchandise framed around identity, not stock keeping.",
      "items": [
        "Matchday pieces",
        "Community wear",
        "Local graphics"
      ]
    },
    {
      "id": "lookbook",
      "kicker": "Lookbook",
      "title": "Visual-heavy blocks for outfits, campaign sets, and bundles.",
      "items": [
        "Editorial imagery",
        "Fit combinations",
        "Bundle highlight"
      ]
    }
  ],
  "layout": "editorial"
} as const;

export type BrandConfig = typeof brandConfig;
