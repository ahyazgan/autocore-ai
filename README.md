# AutoCore.ai

**The Only Auto Tool You Need.** A global automotive platform with 30+ tools across four hubs.

## Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4 (CSS-first, no `tailwind.config.js`)
- **UI:** shadcn-style components, Lucide React icons
- **Font:** Geist (Google Fonts)

## Design — "The Iceberg"

- **Aesthetic:** Stealth Luxury. Dark mode by default.
- **Colors:** Deep blacks (`#0a0a0a`), carbon grays, electric blue accents.
- **Layout:** Minimalist landing + full-width Mega Menu (Tools) in the navbar.

## Hubs & Tools

| Hub | Route | Tools |
|-----|--------|--------|
| **Studio** | `/studio` | BG Remover, 360° Spin, Damage Detect, Virtual Tuner, Listing Gen, Reels Maker |
| **Data** | `/data` | VIN Decoder, Price Check, TCO Calculator, Future Value, Lemon Check, Import Calc, Scam Detect |
| **EV** | `/ev` | Range Estimator, Charging Cost, Battery Health, Savings Calc |
| **Garage** | `/garage` | Mechanic AI, Dashboard Lights, OBD Codes, Radio Code, Tire Calc, Oil Finder, Part Cross-Ref |

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structure

- `app/` — App Router: `page.tsx`, `layout.tsx`, `globals.css`; hub layouts and tool pages under `studio/`, `data/`, `ev/`, `garage/`.
- `components/` — `Navbar.tsx` (with Mega Menu), `Footer.tsx`, `HeroSection.tsx`; `ui/button.tsx`.
- `lib/utils.ts` — `cn()` for class names.

All tool pages are responsive placeholders ready for backend integration.
