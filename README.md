# Thejan Marasinhe | International Education Consultant

Animated portfolio site for Thejan Marasinhe, focused on study in Australia.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, Motion (animations) and Lenis (smooth scrolling).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Editing content

All text and data live in [src/data/content.ts](src/data/content.ts). Before launch:

- `CONTACT`: set the real WhatsApp number (digits only, with country code) and email
- `CREDENTIALS`: exact credential titles; add badge images
- `DESTINATIONS` / `DEST_INFO`: matching tags and per-country details
- `TOURS`: add a `youtubeId` to each tour to show the real video
- `STORIES`, `REVIEWS`: real student names, quotes and reviews (with permission)
- `SOCIALS`: real handles and links
- Photos: partnership tiles in `src/components/Proof.tsx` and the portrait in `src/components/Journey.tsx` (look for the "Replace with" comments)

The original content reference is in [WEBSITE_CONTENT.md](WEBSITE_CONTENT.md).

## Sections

Preloader → Hero (boarding pass) → Destination marquee → How I help → Australia focus + pinned city scroll → Destination finder → Credentials → Partnerships → University tours → Success stories → Reviews → About → How it works → Contact form → Social → Final CTA → Footer

Animations respect the visitor's "reduce motion" setting.
