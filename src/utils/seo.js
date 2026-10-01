import * as contentEn from '../data/content.en.js';
import * as contentAr from '../data/content.ar.js';

const BASE_URL = 'https://nourhan-portfolio-nu.vercel.app';

/**
 * Updates document title, meta tags, OpenGraph, Twitter, canonical, hreflang,
 * and JSON-LD structured data dynamically based on the current route and language.
 */
export function updateSeo(routeInfo) {
  if (typeof document === 'undefined') return;

  const { lang, isCaseStudy, systemId } = routeInfo;
  const isAr = lang === 'ar';

  let title = '';
  let description = '';
  let canonicalPath = '';
  let alternateEnPath = '';
  let alternateArPath = '';
  let imageAlt = '';

  if (isCaseStudy && systemId) {
    const systemEn = contentEn.systems.find((s) => s.id === systemId);
    const systemAr = contentAr.systems.find((s) => s.id === systemId);

    canonicalPath = isAr ? `/ar/systems/${systemId}` : `/systems/${systemId}`;
    alternateEnPath = `/systems/${systemId}`;
    alternateArPath = `/ar/systems/${systemId}`;

    if (isAr) {
      const titlePrefix = systemAr?.title || 'دراسة حالة';
      title = `${titlePrefix} — دراسة حالة | نورهان محمد`;
      description = systemAr?.summary || 'دراسة حالة عملية لسير عمل مؤتمت بالذكاء الاصطناعي.';
      imageAlt = `${titlePrefix} — نورهان محمد`;
    } else {
      const titlePrefix = systemEn?.title || 'Case Study';
      title = `${titlePrefix} — Case Study | Nourhan Mohamed`;
      description = systemEn?.summary || 'Operational workflow automation case study.';
      imageAlt = `${titlePrefix} — Nourhan Mohamed`;
    }
  } else {
    canonicalPath = isAr ? '/ar' : '/';
    alternateEnPath = '/';
    alternateArPath = '/ar';

    if (isAr) {
      title = 'نورهان محمد — أتمتة العمليات بالذكاء الاصطناعي وتصميم مسارات العمل';
      description =
        'مستقلة في أتمتة العمليات وتصميم مسارات العمل. تحويل العمليات اليدوية المتكررة إلى أنظمة مؤتمتة باستخدام n8n وواجهات برمجة التطبيقات ونماذج الذكاء الاصطناعي.';
      imageAlt = 'نورهان محمد — أتمتة العمليات بالذكاء الاصطناعي وتصميم مسارات العمل';
    } else {
      title = 'Nourhan Mohamed — AI Automation & Workflow Design';
      description =
        'AI Automation & Workflow Automation Freelancer. Turning repetitive manual processes into structured, automated systems with n8n, APIs, and LLMs.';
      imageAlt = 'Nourhan Mohamed — AI Automation & Workflow Automation';
    }
  }

  const canonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
  const hreflangEn = `${BASE_URL}${alternateEnPath === '/' ? '/' : alternateEnPath}`;
  const hreflangAr = `${BASE_URL}${alternateArPath}`;
  const ogLocale = isAr ? 'ar_AR' : 'en_US';
  const ogLocaleAlt = isAr ? 'en_US' : 'ar_AR';

  // 1. Document Title
  document.title = title;

  // 2. Helper to set or create <meta> tags
  const setMeta = (attrKey, attrVal, content) => {
    let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrKey, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Description
  setMeta('name', 'description', description);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // hreflang Alternate Links
  const setHrefLang = (langCode, url) => {
    let el = document.querySelector(`link[rel="alternate"][hreflang="${langCode}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', langCode);
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  };
  setHrefLang('en', hreflangEn);
  setHrefLang('ar', hreflangAr);
  setHrefLang('x-default', hreflangEn);

  // Open Graph
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:locale', ogLocale);
  setMeta('property', 'og:locale:alternate', ogLocaleAlt);
  setMeta('property', 'og:image:alt', imageAlt);

  // Twitter Cards
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:url', canonicalUrl);

  // JSON-LD Person Structured Data
  let jsonLdEl = document.querySelector('script[type="application/ld+json"]');
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.setAttribute('type', 'application/ld+json');
    document.head.appendChild(jsonLdEl);
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nourhan Mohamed',
    url: canonicalUrl,
    jobTitle: isAr
      ? 'مستقلة في أتمتة العمليات وتصميم مسارات العمل'
      : 'AI Automation & Workflow Automation Freelancer',
    description: isAr
      ? 'مستقلة في أتمتة العمليات وتصميم مسارات العمل عبر n8n وواجهات برمجة التطبيقات ونماذج الذكاء الاصطناعي.'
      : 'AI Automation & Workflow Automation Freelancer. Turning repetitive manual processes into structured, automated systems with n8n, APIs, and LLMs.',
    knowsLanguage: ['en', 'ar'],
    sameAs: [
      'https://www.linkedin.com/in/nourhan-mohamed-ai',
      'https://khamsat.com/user/nourmohamed_23',
      'https://mostaql.com/u/Nour_Mohamed05',
      'https://nafezly.com/u/Nourhan__Mohamed',
      'https://freelanceyard.com/ar/freelancers/norhan-mhmd',
      'https://github.com/NourhanMohamed-eng',
    ],
  };

  jsonLdEl.textContent = JSON.stringify(jsonLdData, null, 2);
}
