# Alcovia Reimagined

A comprehensive revamp of the Alcovia digital experience — the world's first Ambition Building Program for Teenagers. Built with premium interactivity and animation-driven design, inspired by experiences like Landonorris.com, while staying true to Alcovia's mission of building future leaders.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), PostCSS |
| **Animations** | [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger, Timelines), [Framer Motion](https://www.framer.com/motion/), [Anime.js](https://animejs.com/), [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) primitives, [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/) |
| **Forms** | React Hook Form, Zod validation |
| **Media** | Sharp (image optimization), pdf-parse, pdf2pic, page-flip (flipbook) |
| **Analytics** | Google Analytics, Facebook Pixel, Vercel Analytics |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Manifesto, Offerings, At School / Outside School toggle, Student Snapshots, Partners, Social Fan, Footer |
| `/about` | About Alcovia |
| `/programs` | Programs showcase — Career Discovery, Mentorship, Academic, Leadership |
| `/f1-workshop` | F1 Workshop event page — "The Billion-Dollar Playbook" |
| `/at-school` | How Alcovia helps students at school |
| `/outside-school` | How Alcovia helps outside school |
| `/meet-the-team` | Team member showcase |
| `/brochure` | Interactive digital flipbook brochure |
| `/contact` | Contact form for parents and students |
| `/menu` | Full-screen navigation menu |
| `/Legal/Privacy-policy` | Privacy policy |
| `/Legal/terms-and-conditions` | Terms and conditions |

---

## Key Features

### Cinematic Hero Section
Multi-layer parallax background responding to scroll and cursor. Custom cursor morphs into a winged Alcovian on hover, with mask animation and 3D cursor tracking. Optimized with `will-change` and GPU-accelerated properties for 60fps.

### The Manifesto
Bold, justified typography with line-by-line scroll reveal using a neon mask effect (GSAP ScrollTrigger). Respects `prefers-reduced-motion`.

### Offerings Horizontal Scroll
9-card horizontal scroll grid with interactive hover effects — lift, scale, and neon accent reveals. Covers Career Discovery, Harvard/UCL Mentorship, and more.

### At School vs. Outside School Toggle
Fluid toggle comparing the two worlds with animated SVG handwritten elements and dynamic content transitions.

### F1 Workshop
Dedicated event page with hero video, text reveal, event details, speaker section, gains breakdown, testimonials, workshop cards, and a mobile floating CTA.

### Interactive Flipbook Brochure
PDF-to-image pipeline with an interactive page-flip viewer for the Alcovia brochure.

### Social Fan & Footer
Social media cards spread out like a hand of cards on scroll, with scale and rotate hover effects. Footer includes animated background, navigation, contact info, and social links.

### Premium Navbar
Color-adaptive navbar that adjusts based on the underlying background section for readability.

### Background & Cursor Effects
- **ParallaxBackground** — Multi-layer depth parallax
- **InteractiveBackground** — Gradient animations responding to interaction
- **LiquidBackground** — Morphing liquid effect
- **ContourBackground** — Contour wave patterns
- **CustomCursor / CursorLens** — Morphing cursor and magnifying lens effects

---

## Project Structure

```
app/                    # Next.js App Router pages
components/             # React components
  ├── f1-workshop/      #   F1 Workshop page components
  ├── at-school/        #   At School page components
  └── ui/               #   shadcn/ui components
lib/                    # Utilities (GSAP animation presets, cn helper)
hooks/                  # Custom React hooks (useMobile, useToast, etc.)
context/                # React Context (HeroAnimation, Session)
utils/                  # Animation presets
scripts/                # PDF extraction utilities (JS + Python)
styles/                 # Global CSS
public/                 # Static assets (fonts, images, videos, brochure pages)
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/alcovia-reimagined.git
cd alcovia-reimagined

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Design Philosophy

**Motion & Feel** — Every interaction is designed to feel weighty and premium. Custom easing curves, spring physics, and staggered animations create depth and fluidity.

**Responsiveness** — Fully responsive from large desktop to mobile. Touch-friendly interactions and simplified parallax on mobile; enhanced cursor effects and immersive scroll on desktop.

**Accessibility** — Semantic HTML, ARIA labels, keyboard navigation (via Radix UI), and `prefers-reduced-motion` support.

**Architecture** — Modular components, React hooks and Context for state, TypeScript throughout.

---

## Links

- **Live Demo:** [alcovia-reimagined.vercel.app](https://alcovia-reimagined.vercel.app)

---

*Built for Alcovia*
