# THE HOOD NEST — PROJECT PLAN

## 1. Project Overview
- **Brand:** THE HOOD NEST
- **Tagline:** YOUR COMFORT. YOUR STYLE.
- **Business:** Men's Winter Wear E-Commerce
- **Target Market:** Bangladesh (National coverage across 64 districts)
- **Currency:** BDT (৳)
- **Positioning:** Classic, Minimal, Affordable-Premium
- **Brand Personality:** Clean, Comfortable, Confident

---

## 2. Technology Stack
- **Runtime:** Node.js (v26+)
- **Build Tool & Bundler:** Vite
- **UI Framework:** React (with TypeScript in strict mode)
- **Styling:** Tailwind CSS (Custom design tokens configured for THE HOOD NEST)
- **Icons:** Lucide React (Clean, minimalist iconography)
- **Routing:** React Router DOM (Declarative client-side routing)
- **State Management:** React Context / Hooks (Clean, modular, lightweight)
- **Package Manager:** npm

---

## 3. Design System Specification

### Color Tokens
- **Primary:** `#14283F` (Deep Midnight Navy — anchor of confidence and structure)
- **Background:** `#F5F2EB` (Warm Linen Cream — cozy, soft, aesthetic canvas)
- **Text:** `#292929` (Charcoal / Off-Black — crisp readability with accessible contrast)
- **Accent:** `#A67C52` (Warm Camel / Toffee — subtle luxury and seasonal warmth)
- **Surface / Card Background:** `#FFFFFF` (Pure white for high-contrast product display)
- **Border / Divider:** `#E3DEC3` / `#E8E4DA` (Subtle warm division lines)
- **Muted Text:** `#6E6E6E`

### Typography Hierarchy
- **Font Stack:** Modern sans-serif with geometric structure (Inter / Plus Jakarta Sans fallback)
- **Display / H1:** Bold, uppercase tracking, authoritative yet warm
- **H2 / Section Titles:** Semibold, clean letter-spacing
- **H3 / Product Titles:** Medium / Semibold
- **Body:** Regular, relaxed line-height (1.6)
- **Price / Numbers:** Tabular figures, bold accent

### Spacing & Layout
- Mobile-first responsive layout (Mobile `< 640px`, Tablet `640px - 1024px`, Desktop `> 1024px`)
- Max container width: `1280px` (`max-w-7xl`)
- Consistent spacing scale based on 4px/8px increments

---

## 4. Project Folder Structure
```
winter-business/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   └── product/
│   │       └── ProductCard.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── PROJECT_PLAN.md
├── README.md
├── tailwind.config.js
├── TASKS.md
└── tsconfig.json
```

---

## 5. Development Phases

### Phase 1: Brand Strategy & Product Research [COMPLETED]
- Market research on men's winter wear in Bangladesh
- Product selection & wholesale/retail pricing matrix
- Initial brand identity, naming & visual moodboard

### Phase 2: Project Setup & Design System [CURRENT]
- Vite + React + TypeScript configuration
- Tailwind CSS with custom design tokens (`#14283F`, `#F5F2EB`, `#292929`, `#A67C52`)
- Reusable UI component library (Buttons, Heading, Cards, Navigation, States)
- Mobile-first responsive layout shell
- Design system validation & build verification

### Phase 3: Catalog & Category Pages [UPCOMING]
- Product data modeling with BDT currency formatting
- Category filters (Hoodies, Sweatshirts, Jackets, Sweaters, Bottoms, Accessories)
- Product detail view with size selector & stock indicators

### Phase 4: Cart, Size Guide & Order Workflow [UPCOMING]
- Local storage persistent shopping cart
- Interactive Bangladesh size recommendation tool (Height + Weight)
- Cash-on-Delivery checkout flow with district validation

### Phase 5: Optimization, Testing & Launch Prep [UPCOMING]
- Lighthouse performance & accessibility audit
- Mobile responsiveness cross-device testing
- Production build optimization
