# ROLE

You are a senior product designer and front-end engineer with strong taste in editorial and technical interface design. You are building a portfolio for a real person. Your work will be judged on originality, craft, and credibility, not on how many features it has.

# PROJECT

Build a personal portfolio for **Nourhan Mohamed**: AI Automation & Workflow Automation Freelancer and Computer & Information Sciences student.

The portfolio is an **interactive map of automation systems she has actually built**, not a CV and not a developer template. Central idea:

> Don't just show what I built. Show how the system works.

A potential client should understand her value within seconds:
Problem → Workflow → AI/Automation Logic → Connected Tools → Outcome.

Stack: Vite + React + Tailwind CSS + lucide-react. No other UI libraries. Animations by CSS and SVG (add framer-motion only if truly needed). Workflow diagrams are hand-built SVG/React, not images.

# BEFORE WRITING CODE

1. Read this whole file.
2. Look at every image in /public/screenshots/.
3. Produce an Implementation Plan covering: information architecture, design tokens, component tree, the data model, and how the diagrams are built. Stop and wait for my approval.

# HARD RULES ON CONTENT ACCURACY (highest priority)

Never invent: clients, revenue, years of experience, testimonials, metrics, KPIs, certifications, production deployments, company names, or contact details. No fake logos, no fake stats, no fake dashboards.

She is positioned as: **AI Automation & Workflow Automation Freelancer / Computer Science Student, with practical projects and growing experience.** Never "senior", never "expert".

Describe results only functionally ("the sales team receives a Telegram notification"), never numerically. Show counters only for real numbers (e.g. `03 SYSTEMS`).

Put ALL content in a single file `src/data/content.js` (projects, nodes, edges, tech, links, copy). Components read from it. Missing links use `"#"` with a `// TODO` comment, and placeholder links must be visibly styled as inactive (no dead-click surprises).

# DESIGN DIRECTION

The interface should feel like a calm, well-made automation workspace turned into a portfolio. Technical, editorial, slightly experimental, professional enough for freelance clients. Not a hacker dashboard, not "futuristic AI".

## Anti-template rules (do not violate)
- No centered hero with a giant gradient headline.
- No three-equal-cards row. No card grids for projects or skills.
- No purple-to-blue gradients, glow blobs, neon, or glassmorphism.
- No badge clouds or pill walls for skills.
- No robots, brains, sparkles, or stock imagery.
- No identical section rhythm (heading, subtitle, grid, repeat). Each section has its own layout logic.
- No emoji as icons. No default Tailwind blue/indigo palette.
- Avoid the fonts Inter, Roboto, Poppins, Space Grotesk as primary choices.

## Design tokens (starting point, refine if you can justify it)
- Background: near-black with a slight warm tint, e.g. `#0E0F11`. Surface `#15171A`, border `#24272C`. Text `#E8E6E1`, muted `#8A8F98`. Avoid pure black and pure white.
- Subtle dot grid on the canvas (1px dots, ~24px spacing, very low opacity), with a slow parallax offset.
- Semantic accents used SPARINGLY, only where they carry meaning, like execution states:
  - Green `#3DDC97` = success/executed/online
  - Orange `#FF9F43` = trigger/action
  - Blue `#5B9DFF` = integrations/data
  - Violet `#A78BFA` = AI/LLM (only on AI-related elements)
  - Red `#FF5C5C` = error/warning (use almost never)
- Typography: an editorial serif or high-contrast display face for big headlines (e.g. Instrument Serif or Fraunces), a refined grotesk for body (e.g. Geist or Schibsted Grotesk), and a monospace for labels and metadata (JetBrains Mono or IBM Plex Mono). Load via Fontsource or self-hosted with `font-display: swap`. Strong scale contrast between huge headlines and tiny uppercase mono labels.
- Node style: rounded rectangle, small coloured icon tile on the left, title plus mono subtitle, input/output ports as small circles on the edges, edges as smooth bezier SVG paths. Closely resemble n8n's visual language without copying its logo.

## Layout ideas (use or improve)
- Treat the page like a long canvas: a thin vertical "execution line" runs down the left edge and lights up as the visitor scrolls; each section is a node on that line with a mono label (`01 / SYSTEMS`).
- Asymmetric editorial composition. Headlines can be set left-aligned and large, with mono metadata offset to the side.
- Use whitespace confidently. Fewer elements, better crafted.

## Handcrafted details (sparingly)
- Nav brand: `NOURHAN.MOHAMED / AUTOMATION LAB`
- Status: `● Available for Automation Projects` (pulsing green dot)
- Project status: `EXECUTED ✓`, workflow counter `03 SYSTEMS`
- Footer line: `Built around processes, not templates.`
- Custom text selection colour, styled focus rings, a tiny "run" affordance on hover of primary buttons.

# PAGE STRUCTURE

Minimal nav: `Nourhan`, `Systems`, `Approach`, `Stack`, `About`, `Contact`, plus the availability indicator. LinkedIn/GitHub appear subtly in nav or contact only.

## 1. Hero
- Mono label: `AI AUTOMATION / WORKFLOW DESIGN / SYSTEM INTEGRATION`
- Headline: **I Turn Repetitive Processes Into Automated Systems.**
- Supporting line: AI Automation & Workflow Automation with n8n, APIs, LLMs and intelligent workflows.
- Component `HeroWorkflow`: a miniature live workflow `INPUT → PROCESS → AI → DECISION → ACTION`. Nodes activate one after another, a data pulse travels along the edges, then it loops calmly. Pause off-screen; respect `prefers-reduced-motion` (show a static "executed" state).
- CTAs: primary **Explore the Systems**, secondary **Let's Build One**.

## 2. Systems I've Built (the heart of the site)
Title: **Systems I've Built**. Subtitle: *Three different problems. Three different automation architectures.*

Layout: a vertical case-study list. Each system is a collapsed "workflow strip" showing its mono label, title, a compact inline node diagram, and tech tags. Selecting one expands it in place (accessible accordion, keyboard operable) to reveal the full diagram, the "What happens inside" steps, and an **Explore Workflow** action that opens the full case-study view (a route or a full-screen panel, with browser back working).

When a system scrolls into view, its edges draw in and its nodes activate sequentially (once).

### System 01: `WORKFLOW 01 / LEAD MANAGEMENT` — Lead Capture & Notifications
Problem: Incoming leads need to be captured, cleaned, stored, and communicated to the relevant team without manually processing every submission.
Nodes/edges: Lead Submission (Webhook) → Format & Clean Data → branches to: Telegram (Notify Sales Team), Gmail (Send Welcome Email), Google Sheets (Append to CRM Sheet).
Tech: n8n, Webhook, Google Sheets, Gmail, Telegram, Data Processing.
Steps:
1. A new lead enters through a submission webhook.
2. The incoming data is cleaned and formatted.
3. The workflow distributes the information to multiple destinations.
4. The sales team receives a Telegram notification.
5. The lead receives a welcome email.
6. The lead information is appended to the CRM sheet.
Include a small Architecture visual. No metrics.

### System 02: `WORKFLOW 02 / AI AGENT` — AI Customer Support Agent
The most AI-focused one; violet accent lives here.
Flow: Incoming Customer Message (Telegram) → AI Agent → AI Response → Send AI Reply (Telegram).
The AI Agent node has three sub-connections: **Chat Model → Google Gemini Chat Model**, **Memory → Simple Memory**, **Tool → Google Sheets**. Render these as the n8n-style attachment ports below the agent node.
Interaction: clicking the AI Agent expands/reveals those three connected resources, showing the agent is connected to context and tools, not just generating text.
Tech: n8n, AI Agent, Google Gemini, Memory, Google Sheets, Telegram, LLM.
Accuracy: present it as an automation/AI-agent project. Do NOT call it production-grade.

### System 03: `WORKFLOW 03 / REPORTING & MONITORING` — Automated Daily Reporting & Alerting
Flow: Daily Trigger — 9 AM → Fetch Daily Operations → Calculate KPI Metrics → branches to: Telegram (KPI Summary to Admin), Gmail (Executive Report).
Tech: n8n, Schedule Trigger, Google Sheets, Data Processing, KPI Calculation, Telegram, Gmail.
Copy: runs automatically at a scheduled time, retrieves operational data, processes it, calculates KPI metrics, and distributes the summary through communication channels.
Add a data-pipeline strip: `RAW DATA → PROCESSING → KPI → REPORT → DECISION`. No numeric results.

## 3. See The Automation (signature feature): `WorkflowExplorer`
A simplified, pannable-feeling canvas (fixed canvas, no heavy library) with a tab or toggle to switch between the three workflows.
- Hover a node: highlight it and its connected nodes/edges, dim everything else, show a small tooltip with its role.
- Click a node: open a side panel (bottom sheet on mobile) with **Node / Purpose / Input / Processing / Output / Connections**.
- Keyboard: nodes focusable, Enter opens the panel, Esc closes.
Write real, accurate panel content for every node in `content.js`.
Example, AI Agent: Purpose "Processes incoming customer messages and generates context-aware responses"; Input "Customer message"; Connections "Gemini + Memory + Google Sheets"; Output "AI-generated response".

## 4. Approach: `AutomationTimeline`
Title: **I Don't Start With Tools. I Start With The Process.**
Four stages, visually chained like a workflow (not a card row):
01 Find the Repetition: identify manual and repetitive tasks.
02 Map the Flow: understand triggers, data, decisions, and outputs.
03 Automate the Connections: connect applications, APIs, data sources, and AI models.
04 Make It Useful: turn the workflow into something that saves time, reduces manual work, or improves information flow.

## 5. Stack: **What I Build With**
A technical system map with subtle connection lines, not coloured badges. Grouped:
Automation: n8n, Zapier. AI: LLMs, AI Agents, Prompt Engineering, RAG. Integration: REST APIs, Webhooks, JSON, Google Sheets, Gmail, Telegram. Programming: Python, Java, C++, JavaScript. Web: HTML, CSS, DOM, LocalStorage.
Hovering an item highlights its related connections. Use lucide icons or plain mono text, no brand-logo walls.
Also a compact "Toolbox" strip showing the tools as one connected chain: n8n → APIs → AI/LLMs → Google Sheets → Gmail → Telegram → Webhooks. It should read "tools connected to solve a process", not "I know many tools".

## 6. Behind The Work (About) — short
I am a Computer and Information Sciences student building my skills in AI automation and workflow design. My current focus is creating practical automation systems using n8n, AI, APIs, and connected business tools. I am particularly interested in turning repetitive manual processes into structured, automated workflows.
Facts to mention (nothing more): B.Sc. Computer and Information Sciences, Egyptian E-Learning University; DEPI — AI & Advanced Automation with n8n; cybersecurity background; practical automation projects.

## 7. Contact
Title: **Have a Process Worth Automating?**
Text: Tell me what you currently do manually. I'll help map the process and identify where automation can fit.
CTA: **Start a Conversation** (opens a `mailto:` link with a prefilled subject; no fake backend or form submission).
Links: LinkedIn, GitHub, Email, Mostaql, Khamsat (placeholders where unknown).

# CASE-STUDY VIEW (per project)
Sections in order: Problem, Architecture (interactive diagram), Automation Logic, Integrations, AI Layer (ONLY for System 02), My Work (what she designed, built, and configured; keep it truthful and modest), Result (functional outcome, no numbers), Workflow Screenshot.

Screenshots come from `/public/screenshots/`: `lead-capture.png`, `ai-support-agent.png`, `daily-reporting.png`. Use the real images, never substitutes. Present them in a browser/canvas-style frame, crop intelligently with `object-position`, add a subtle zoom on hover and a click-to-open lightbox, optionally with highlight rings on key nodes. Always keep the uncropped image reachable. Add meaningful `alt` text, explicit width/height to prevent layout shift, and lazy loading below the fold.
The screenshots are proof; the SVG diagram is the explanation. Show both.

# MOTION
Motion must communicate flow: edges drawing, pulses along paths, sequential node activation, progressive section reveals. Trigger once with IntersectionObserver. Nothing bounces, floats, or loops without purpose. Everything honours `prefers-reduced-motion`.

# RESPONSIVE
Must work perfectly at 1440, 1024, 768, and 390px.
On mobile, do NOT shrink the desktop diagrams. Convert them into clean vertical pipelines (nodes stacked, connector lines between them, branches shown as indented sub-lists or a fork indicator). The explorer side panel becomes a bottom sheet. Minimum 16px body text, 44px touch targets.

# ENGINEERING QUALITY
- Reusable components: `HeroWorkflow`, `WorkflowExplorer`, `ProjectCaseStudy`, `WorkflowNode`, `WorkflowEdge`, `IntegrationBadge`, `AutomationTimeline`, `ContactSection`, `SectionLabel`, `StatusIndicator`.
- One diagram engine: nodes and edges defined as data and rendered by shared components for both desktop and mobile, so the layout adapts rather than being duplicated.
- Accessibility: semantic landmarks, proper heading order, skip link, visible focus, ARIA for accordion/tabs/panel, colour contrast AA, diagrams have text alternatives (an ordered list equivalent for screen readers).
- SEO: title, meta description, canonical placeholder, Open Graph and Twitter tags, `lang="en"`, JSON-LD `Person`, favicon.
- Performance: fonts subsetted, images optimized (WebP with fallback or sized properly), no heavy dependencies, code-split the case-study view. Target Lighthouse 90+ across categories.
- Clean folder structure, readable code, no unused files.

# BUILD ORDER (pause for my review after each phase)
1. Setup, design tokens, fonts, nav, hero with workflow animation.
2. Systems section with the three workflow strips, expandable.
3. Case-study view plus screenshot frames and lightbox.
4. WorkflowExplorer.
5. Approach, Stack/Toolbox, About, Contact, footer.
6. Responsive pass, accessibility, SEO, performance, final QA.

# DEFINITION OF DONE
- [ ] Reads instantly as an automation studio, not a template.
- [ ] Projects are workflow diagrams, not cards.
- [ ] Zero invented facts or numbers anywhere.
- [ ] Real screenshots used and presented well.
- [ ] Node names in diagrams match the real workflows above.
- [ ] Mobile shows vertical pipelines, fully readable.
- [ ] Keyboard and reduced-motion friendly.
- [ ] Passes the test: if it looks like "name + big gradient headline + cards + skills + form", it has failed. Redesign it.

The visitor should remember it for its workflow-first experience: "I don't just use AI tools. I design workflows that connect tools, data, AI, and actions into a working system."