import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as contentEn from '../data/content.en';
import * as contentAr from '../data/content.ar';
import { updateSeo } from '../utils/seo';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Parse path to determine initial language and route
  const parsePath = useCallback((pathname = (typeof window !== 'undefined' ? window.location.pathname : '/')) => {
    const cleanPath = (pathname.split('#')[0]).split('?')[0];
    const isAr = cleanPath === '/ar' || cleanPath.startsWith('/ar/');
    const isCaseStudy = cleanPath.includes('/systems/');
    let systemId = null;

    if (isCaseStudy) {
      if (isAr) {
        systemId = cleanPath.replace(/^\/ar\/systems\/?/, '').replace(/\/$/, '');
      } else {
        systemId = cleanPath.replace(/^\/systems\/?/, '').replace(/\/$/, '');
      }
    }

    return {
      lang: isAr ? 'ar' : 'en',
      isCaseStudy,
      systemId,
      pathname: cleanPath,
    };
  }, []);

  const [routeInfo, setRouteInfo] = useState(() => {
    const initial = parsePath(typeof window !== 'undefined' ? window.location.pathname : '/');
    if (typeof document !== 'undefined') {
      document.documentElement.lang = initial.lang;
      document.documentElement.dir = initial.lang === 'ar' ? 'rtl' : 'ltr';
      updateSeo(initial);
    }
    return initial;
  });

  // Keep <html lang="..." dir="..."> and SEO head metadata synchronized whenever routeInfo changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = routeInfo.lang;
      document.documentElement.dir = routeInfo.lang === 'ar' ? 'rtl' : 'ltr';
      updateSeo(routeInfo);
    }
  }, [routeInfo]);

  // Sync on browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const updated = parsePath(window.location.pathname);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = updated.lang;
        document.documentElement.dir = updated.lang === 'ar' ? 'rtl' : 'ltr';
      }
      setRouteInfo(updated);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parsePath]);

  // Navigate to path within the SPA
  const navigate = useCallback((targetPath) => {
    const hash = targetPath.includes('#') ? targetPath.slice(targetPath.indexOf('#')) : '';
    const cleanTargetPath = (targetPath.split('#')[0]).split('?')[0];

    let resolvedPath = cleanTargetPath;
    if (routeInfo.lang === 'ar') {
      if (!resolvedPath.startsWith('/ar')) {
        resolvedPath = resolvedPath === '/' ? '/ar' : `/ar${resolvedPath}`;
      }
    } else {
      if (resolvedPath.startsWith('/ar')) {
        resolvedPath = resolvedPath.replace(/^\/ar/, '') || '/';
      }
    }

    const fullUrl = hash ? `${resolvedPath}${hash}` : resolvedPath;

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', fullUrl);
      const parsed = parsePath(resolvedPath);
      // Retain current language
      parsed.lang = routeInfo.lang;
      if (typeof document !== 'undefined') {
        document.documentElement.lang = routeInfo.lang;
        document.documentElement.dir = routeInfo.lang === 'ar' ? 'rtl' : 'ltr';
      }
      setRouteInfo(parsed);
      window.scrollTo(0, 0);
    }
  }, [routeInfo.lang, parsePath]);

  // Switch language immediately updating DOM, history, and state
  const switchLanguage = useCallback((targetLang) => {
    if (!targetLang || targetLang === routeInfo.lang) return;

    try {
      localStorage.setItem('preferred_lang', targetLang);
    } catch {
      // localStorage may fail in restricted/private browsing modes
    }

    const hash = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash : '';
    let nextPath = '/';
    let isCaseStudy = false;
    let systemId = null;

    if (routeInfo.isCaseStudy && routeInfo.systemId) {
      isCaseStudy = true;
      systemId = routeInfo.systemId;
      nextPath = targetLang === 'ar'
        ? `/ar/systems/${routeInfo.systemId}`
        : `/systems/${routeInfo.systemId}`;
    } else {
      nextPath = targetLang === 'ar' ? '/ar' : '/';
    }

    const fullUrl = hash ? `${nextPath}${hash}` : nextPath;

    // 1. Immediately update html tag attributes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = targetLang;
      document.documentElement.dir = targetLang === 'ar' ? 'rtl' : 'ltr';
    }

    // 2. Immediately push browser history
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', fullUrl);
    }

    // 3. Immediately update React state
    setRouteInfo({
      lang: targetLang,
      isCaseStudy,
      systemId,
      pathname: nextPath,
    });
  }, [routeInfo]);

  const content = useMemo(() => {
    return routeInfo.lang === 'ar' ? contentAr : contentEn;
  }, [routeInfo.lang]);

  const value = {
    lang: routeInfo.lang,
    dir: routeInfo.lang === 'ar' ? 'rtl' : 'ltr',
    isRTL: routeInfo.lang === 'ar',
    isCaseStudy: routeInfo.isCaseStudy,
    activeSystemId: routeInfo.systemId,
    currentPath: routeInfo.pathname,
    navigate,
    switchLanguage,
    setLanguage: switchLanguage,
    content,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useContent() {
  const { content } = useLanguage();
  return content;
}
