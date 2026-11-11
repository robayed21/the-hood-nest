# THE HOOD NEST — Men's Winter Wear E-Commerce Platform

> **YOUR COMFORT. YOUR STYLE.**  
> Classic, Minimal, Affordable-Premium Men's Winter Wear for Bangladesh.

---

## 🎨 Design System Specifications

| Token | Hex Value | Name / Purpose |
| :--- | :--- | :--- |
| **Primary** | `#14283F` | Deep Midnight Navy (Authoritative, structured anchor) |
| **Background** | `#F5F2EB` | Warm Linen Cream (Soft, cozy aesthetic canvas) |
| **Text** | `#292929` | Charcoal / Off-Black (Crisp readability, high contrast) |
| **Accent** | `#A67C52` | Warm Toffee / Camel Leather (Seasonal warmth & subtle luxury) |

- **Currency:** BDT (৳)
- **Aesthetic:** Minimalist Men's Streetwear & Smart Casual
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or newer recommended, verified on v26+)
- npm (v9.0 or newer)

### Installation
```bash
# 1. Clone or open the project directory
cd "winter business"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will be running at `http://localhost:3000`.

### Available Scripts
- `npm run dev`: Starts the Vite development server on port 3000.
- `npm run build`: Type-checks with TypeScript and compiles the production bundle into `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run type-check`: Runs TypeScript compiler without emitting files.

---

## 📂 Project Architecture

```
winter-business/
├── public/
│   ├── favicon.svg                  # Brand vector favicon
│   └── images/                      # Real catalog & brand mockups
│       ├── mens_oversized_hoodie_olive_1794384426206.jpg
│       ├── mens_bomber_jacket_navy_1794384446032.jpg
│       ├── mens_denim_trucker_jacket_1794384476816.jpg
│       ├── mens_ribbed_turtleneck_camel_1794384506709.jpg
│       ├── mens_commuter_windbreaker_black_1794384535646.jpg
│       ├── mens_fleece_joggers_heather_grey_1794384562015.jpg
│       └── the_hood_nest_brand_mockup_1794394738409.jpg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx           # Reusable button styles (Primary, Secondary, Accent, Outline, Ghost, Loading)
│   │   │   ├── SectionHeading.tsx   # Typography hierarchy & badges
│   │   │   ├── LoadingState.tsx     # Skeleton and spinner states
│   │   │   └── EmptyState.tsx       # Reusable empty result container
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Top banner, navigation, actions & cart count
│   │   │   ├── Logo.tsx             # Brand logo & monogram component
│   │   │   ├── Navigation.tsx       # Desktop category links
│   │   │   ├── MobileNavigation.tsx # Slide-out responsive drawer
│   │   │   ├── Footer.tsx           # Trust badges, links & contact info
│   │   │   └── MainLayout.tsx       # Global layout wrapper
│   │   └── product/
│   │       └── ProductCard.tsx      # Card with image, GSM tag, BDT pricing & action
│   ├── pages/
│   │   ├── HomePage.tsx             # Hero, category pills, product grid & design system showcase
│   │   └── NotFoundPage.tsx         # 404 handler
│   ├── types/
│   │   └── index.ts                 # Product, Category & Navigation TypeScript types
│   ├── App.tsx                      # Main app shell & routing
│   ├── main.tsx                     # React entrypoint
│   └── index.css                    # Tailwind directives & design tokens
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── PROJECT_PLAN.md                  # Complete architectural plan
├── tailwind.config.js               # Design token configuration
├── TASKS.md                         # Task tracker & checklist
├── tsconfig.json
└── vite.config.ts
```

---

## 📋 Phase Status (100% Complete)
- [x] **Phase 1:** Brand Strategy, Market Research & Product Planning (Completed)
- [x] **Phase 2:** Project Setup, Typography, Colors & Design System (Completed)
- [x] **Phase 3:** Core Winter Catalog, Dynamic Categories & Product Modal (Completed)
- [x] **Phase 4:** Persistent Cart, Bangladesh Size Advisor & Cash on Delivery Checkout (Completed)
- [x] **Phase 5:** Cross-Device Verification, Performance & Production Readiness (Completed)

