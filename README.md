# Nourhan Mohamed — Automation Lab

A bilingual (English / Arabic) portfolio that presents n8n automation projects as interactive workflow diagrams, instead of a typical list of project cards.

**Live site:** https://nourhan-portfolio-nu.vercel.app
**Arabic version:** https://nourhan-portfolio-nu.vercel.app/ar

## About the project

Each project is shown as a hand-built workflow diagram, next to the real n8n screenshot, so a visitor can see how the system works: problem, workflow, connected tools, and outcome.

### Systems featured

1. **Lead Capture & Notifications**: Webhook, data formatting, then Telegram, Gmail and Google Sheets.
2. **AI Customer Support Agent**: Telegram, AI Agent with Google Gemini, conversation memory and a Google Sheets tool.
3. **Automated Daily Reporting & Alerting**: Schedule trigger, Google Sheets, KPI calculation in a Code node, then Telegram and Gmail.

### Features

- Custom SVG workflow diagram engine (no diagram library)
- Interactive Workflow Explorer with a node inspector panel
- Case study pages with a screenshot lightbox
- English and Arabic (RTL) versions, with diagrams kept left-to-right
- Accessibility: keyboard navigation, skip link, reduced-motion support
- Lighthouse 90+ in all categories

## Tech stack

React, Vite, Tailwind CSS, Lucide icons. Hosted on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

- `src/data/workflows.js`: nodes and edges for each system
- `src/data/content.en.js` and `content.ar.js`: all site text
- `src/components/`: layout, hero, systems, diagram, explorer and other sections
- `public/screenshots/`: n8n workflow screenshots
- `docs/`: original design prompts

## Contact

Nourhan Mohamed, AI Automation & Workflow Automation Freelancer
[LinkedIn](https://www.linkedin.com/in/nourhan-mohamed-ai) · [Khamsat](https://khamsat.com/user/nourmohamed_23)onfiguration
└── index.html            # HTML entry point, SEO metadata, and JSON-LD schema
```
