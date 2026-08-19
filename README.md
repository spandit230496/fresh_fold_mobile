# FreshFold Mobile

A React Native (Expo) mobile app for FreshFold — same brand, theme and content system as the FreshFold web app, rebuilt for iOS and Android with React Navigation.

## Design System (matches the web app)
- **Colors:** Lime `#A8CF32`, Dark Navy `#10233F`, Light Green `#EEF7D8`, Light Gray `#F4F5F3`, Soft Yellow `#F7D96A`
- **Typography:** Nunito Sans (400/500/600/700/800), loaded via `@expo-google-fonts/nunito-sans`
- **Radii:** cards 24–28, buttons fully rounded (999), inputs 14–16, images 20–28 — see `src/theme/theme.js`

## Getting Started

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `i` / `a` for a simulator/emulator.

## Structure

- `src/theme/theme.js` — colors, radii, spacing, typography, shadows (single source of truth, mirrors the web Tailwind tokens)
- `src/data/` — same content files as the web app (services, pricing, stores, offers, testimonials, faqs, blogs)
- `src/components/shared/` — Text, Button, Badge, Card, SectionHeading, Artwork (gradient+icon illustration, no third-party photography), Logo, ServiceCard, PricingTable, OfferCard, StoreCard, TestimonialCard, FAQAccordion, CTASection, FormField, Screen, ScreenHeader
- `src/components/booking/` — BookingStepper for the Schedule Pickup wizard
- `src/navigation/` — `RootNavigator` (stack) wrapping `TabsNavigator` (bottom tabs: Home, Services, Schedule, Track, More) plus shared detail screens (Service Detail, Store Detail, Blog Detail, Pricing, Offers, Locations, About, FAQ, Contact, How It Works, Franchise, Blogs)
- `src/screens/` — one file per screen

## Navigation map

- **Tabs:** Home · Services · Schedule (booking wizard) · Track (order tracker) · More (menu hub)
- **Pushed from any tab:** Service Detail, Store Detail, Blog Detail, Pricing, Offers, Locations, About, FAQ, Contact, How It Works, Franchise, Blogs

## Notes

- Imagery uses the same original `Artwork` illustration system as the web app (gradient + Lucide icon), not stock photography — swap for real photos via `expo-image`/`Image` once available.
- Verified with `npx expo export --platform ios` — all 2800+ modules bundle cleanly.
