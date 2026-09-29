# TASK: Add an Arabic (RTL) version of the portfolio

The English site is complete and approved. Add a full Arabic version without breaking or duplicating the existing architecture. First produce a short Implementation Plan and wait for my approval before coding.

# 1. i18n ARCHITECTURE (no heavy libraries)
- Do not add react-i18next or similar. Build a small `LanguageProvider` (React Context) plus a `useT()` hook.
- Split content into language-aware files: `src/data/content.en.js` and `src/data/content.ar.js`, with IDENTICAL keys and structure.
- Language-neutral data (node IDs, edges, coordinates, tech names, links, screenshot paths) stays in ONE shared file so diagrams are never duplicated. Only human-readable strings (labels, descriptions, panel text, steps) are translated.
- Routes: English at `/`, Arabic at `/ar`, and case studies at `/systems/:id` and `/ar/systems/:id`. Browser back must keep working.
- Language switcher in the nav: `EN | عربي`. It keeps the user on the equivalent page/section, and remembers the choice in localStorage (wrapped in try/catch). Do NOT auto-redirect based on browser language.

# 2. RTL IMPLEMENTATION
- Set `<html lang="ar" dir="rtl">` when Arabic is active, and `lang="en" dir="ltr"` otherwise, updated on route change.
- Use Tailwind logical properties everywhere: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `border-s`, `rounded-s-*`. Refactor existing physical classes (`ml-`, `pr-`, `left-`, `text-left`, etc.) to logical ones so one codebase serves both directions.
- Use `rtl:` and `ltr:` variants only where logical properties are not enough.
- Icons that imply direction (arrows, chevrons, "run" affordance) must flip in RTL. Icons that do not imply direction must not flip.
- The vertical "execution line" moves to the right edge in RTL.
- Section layout logic mirrors: side metadata, asymmetric compositions, side panel (opens from the left in RTL), timeline direction.

# 3. DIAGRAMS STAY LTR (important)
- All workflow diagrams (HeroWorkflow, system diagrams, WorkflowExplorer canvas, Toolbox chain, data-pipeline strip) keep `dir="ltr"` on their container, in both languages. Flow direction, ports, bezier edges and animation direction must not flip.
- Only the text INSIDE nodes may be Arabic where needed. Keep node titles in English (they match real n8n node names) and put the Arabic explanation in tooltips and side panels.
- On mobile, the vertical pipeline is naturally direction-neutral; keep connector lines centered on the node axis, and put text alignment on `text-start`.
- Mono labels and technical terms (n8n, Webhook, API, JSON, Gemini, Telegram, Gmail, Google Sheets, KPI, LLM, RAG) stay in Latin script in both languages. Wrap them with `dir="ltr"` inline (use `<bdi>` or `<span dir="ltr">`) so punctuation and mixed text render correctly.

# 4. ARABIC TYPOGRAPHY
- Do NOT reuse the Latin display serif for Arabic. Pick a matching Arabic pairing and load through Fontsource, `font-display: swap`, subset to Arabic:
  - Headlines: `IBM Plex Sans Arabic` (SemiBold) or `Readex Pro` or `Noto Kufi Arabic`.
  - Body: `IBM Plex Sans Arabic` or `Noto Sans Arabic`.
  - Mono labels stay JetBrains Mono / IBM Plex Mono (Latin text only).
- Apply via a `[lang="ar"]` font stack override in CSS variables, not per component.
- Arabic needs more line height: body ~1.8, headlines ~1.3. Do NOT use letter-spacing or `uppercase` on Arabic text (it breaks letter joining). Keep tracking and uppercase for Latin labels only.
- Arabic headlines usually need a smaller font size than the English serif at the same visual weight; tune the scale for `[lang="ar"]`.
- Use Western digits (0-9) for numbers and labels like `01`, `03 SYSTEMS`, `9 AM`, to stay consistent with the technical style.

# 5. ARABIC COPY (tone and rules)
- Tone: clear, confident, modest, professional. Modern Standard Arabic with a light, natural, human touch. Not stiff or bureaucratic, not slangy, and not a word-for-word translation. Rewrite sentences so they sound natural in Arabic.
- Do not add any claim that is not in the English version. Same accuracy rules: no invented clients, numbers, experience or results. Never "expert" or "senior".
- Keep the same meaning for every string. If a phrase is awkward in Arabic, adapt it while preserving the meaning.
- Suggested key translations (refine if you have better options):
  - Hero headline: "أحوّل العمليات المتكررة إلى أنظمة مؤتمتة."
  - Supporting line: "أتمتة بالذكاء الاصطناعي وأتمتة سير العمل باستخدام n8n وواجهات API ونماذج اللغة والـ workflows الذكية."
  - Primary CTA: "استكشف الأنظمة" / Secondary: "خلّينا نبني واحد" (or a slightly more formal alternative)
  - Systems title: "أنظمة قمت ببنائها" / Subtitle: "ثلاث مشكلات مختلفة. ثلاث معماريات أتمتة مختلفة."
  - Approach title: "لا أبدأ بالأدوات. أبدأ بالعملية."
  - Stack title: "ما أبني به"
  - About title: "خلف العمل"
  - Contact title: "هل لديك عملية تستحق الأتمتة؟"
  - Contact text: "أخبرني بما تفعله يدويًا حاليًا، وسأساعدك في رسم العملية وتحديد أين يمكن للأتمتة أن تنسجم."
  - Contact CTA: "ابدأ محادثة"
  - Nav: Nourhan → "نورهان" (brand label `NOURHAN.MOHAMED / AUTOMATION LAB` stays Latin), الأنظمة، المنهج، الأدوات، عنّي، تواصل
  - Status: "متاحة لمشاريع الأتمتة"
  - Footer: "مبني حول العمليات، لا القوالب."
- Gender: the site speaks in first person as a woman. Use feminine forms consistently where Arabic requires it (e.g. "متاحة", "قمتُ").
- Translate ALL node panel content (Purpose / Input / Processing / Output / Connections), the case-study sections, the 4-stage approach, About text, and aria-labels.

# 6. SEO FOR ARABIC
- Separate `<title>`, meta description, Open Graph and Twitter tags per language, in Arabic for `/ar`. Update on route change.
- `hreflang` alternates: `en`, `ar`, and `x-default` pointing to English, plus a canonical per language.
- JSON-LD `Person` includes `knowsLanguage: ["en", "ar"]` and Arabic `description` on the Arabic pages.
- `og:locale` = `ar_AR` (with `en_US` as alternate) on Arabic pages.

# 7. ACCESSIBILITY
- `lang` attribute on any Latin text embedded in Arabic sentences when it helps screen readers.
- Screen-reader text alternatives for diagrams must be provided in Arabic, in reading order.
- Focus order follows the visual order in RTL. Arrow-key behaviors (tabs, accordion, explorer navigation) must respect direction: ArrowRight moves to the previous item in RTL.
- Language switcher has an accessible name and `aria-current` on the active language.

# 8. BUILD ORDER (pause for my review after each phase)
1. Provider, routes, `dir/lang` handling, switcher, refactor physical Tailwind classes to logical ones, plus Arabic font setup.
2. Arabic copy for nav, hero, systems, approach, stack, about, contact, footer.
3. Arabic node panel content and case-study content, plus diagram LTR isolation.
4. Mobile RTL pass at 390 and 768, then 1024 and 1440.
5. SEO, hreflang, accessibility, final QA on both languages.

# DEFINITION OF DONE
- [ ] English version unchanged and still perfect.
- [ ] No text overflow, no broken mixed Arabic/English punctuation.
- [ ] All diagrams render and animate identically in both languages (LTR).
- [ ] No physical left/right Tailwind classes remain in components.
- [ ] Every visible string exists in both languages, including tooltips, aria-labels and alt text.
- [ ] Arabic reads naturally, like it was written by a person, not machine-translated.
- [ ] Zero new invented facts.