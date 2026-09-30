# Nourhan Mohamed — AI Automation & Workflow Portfolio

Editorial and technical portfolio showcasing practical workflow automation systems, custom n8n architectures, and connected business process engineering.

## 🛠️ Technologies

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties, Tailwind Logical Properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`)
- **Typography**: Fraunces Variable (Headlines), Geist Sans (Body), JetBrains Mono (Technical / Code)
- **Icons**: Lucide React
- **Architecture Engine**: Hand-crafted interactive SVG workflow canvas engine with live trace highlighting, focus-trapped inspector drawer, and responsive mobile bottom sheet
- **Accessibility & SEO**: WCAG 2.1 AA compliant, ARIA landmarks, keyboard-navigable diagrams, JSON-LD `Person` schema, Open Graph & Twitter meta tags

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Runs the development server locally (default: `http://localhost:5173/`).

### Production Build

```bash
npm run build
```

Generates optimized, code-split production assets in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally (default: `http://localhost:4173/`).

## 📁 Project Structure

```text
├── docs/                 # Original technical specification prompts
├── public/
│   ├── _redirects        # SPA route redirects for static hosting
│   └── screenshots/      # High-resolution n8n workflow canvas captures
├── src/
│   ├── components/
│   │   ├── about/        # Grounded academic & practical background facts
│   │   ├── approach/     # 4-stage process automation timeline
│   │   ├── casestudy/    # Full deep-dive workflow case studies
│   │   ├── contact/      # Validated client inquiry & verified platform links
│   │   ├── diagram/      # SVG workflow canvas, edges, nodes, and mobile pipelines
│   │   ├── explorer/     # Interactive multi-tab workflow inspector
│   │   ├── hero/         # Asymmetric hero section & live workflow simulation
│   │   ├── layout/       # Navbar, execution line, and footer
│   │   ├── stack/        # Connected toolchain pipeline & technology matrix
│   │   └── ui/           # Lightbox and browser-framed screenshot previews
│   ├── data/
│   │   ├── content.en.js # Centralized English copy, case studies, and contact data
│   │   └── workflows.js  # SVG node and edge coordinate geometry
│   ├── App.jsx           # Main application router and lazy suspense boundaries
│   └── main.jsx          # React DOM root entry point
├── vercel.json           # Vercel SPA rewrite configuration
└── index.html            # HTML entry point, SEO metadata, and JSON-LD schema
```
