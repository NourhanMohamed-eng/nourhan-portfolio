import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as contentEn from '../data/content.en';
import * as contentAr from '../data/content.ar';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Parse path to determine initial language and route
  const getRouteInfo = useCallback((pathname = window.location.pathname) => {
    const isAr = pathname === '/ar' || pathname.startsWith('/ar/') || pathname.startsWith('/ar?');
    const isCaseStudy = pathname.includes('/systems/');
    let systemId = null;

    if (isCaseStudy) {
      if (isAr) {
        systemId = pathname.replace('/ar/systems/', '').replace(/\/$/, '');
      } else {
        systemId = pathname.replace('/systems/', '').replace(/\/$/, '');
      }
    }

    return {
      lang: isAr ? 'ar' : 'en',
      isCaseStudy,
      systemId,
      pathname,
    };
  }, []);

  const [routeInfo, setRouteInfo] = useState(() => getRouteInfo());

  // Keep <html lang="..." dir="..."> synchronized
  useEffect(() => {
    const { lang } = routeInfo;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [routeInfo]);

  // Sync on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setRouteInfo(getRouteInfo(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getRouteInfo]);

  // Navigate to path within the SPA
  const navigate = useCallback((targetPath) => {
    let resolvedPath = targetPath;
    if (routeInfo.lang === 'ar' && !targetPath.startsWith('/ar')) {
      resolvedPath = targetPath === '/' ? '/ar' : `/ar${targetPath}`;
    }
    if (resolvedPath !== window.location.pathname) {
      window.history.pushState({}, '', resolvedPath);
      setRouteInfo(getRouteInfo(resolvedPath));
    }
  }, [routeInfo.lang, getRouteInfo]);

  // Switch language preserving current view & section
  const switchLanguage = useCallback((targetLang) => {
    if (targetLang === routeInfo.lang) return;

    try {
      localStorage.setItem('preferred_lang', targetLang);
    } catch {
      // localStorage may fail in restricted/private browsing modes
    }

    let nextPath = '/';
    const hash = window.location.hash || '';

    if (routeInfo.isCaseStudy && routeInfo.systemId) {
      nextPath = targetLang === 'ar' 
        ? `/ar/systems/${routeInfo.systemId}`
        : `/systems/${routeInfo.systemId}`;
    } else {
      nextPath = targetLang === 'ar' ? '/ar' : '/';
      if (hash) {
        nextPath += hash;
      }
    }

    document.documentElement.lang = targetLang;
    document.documentElement.dir = targetLang === 'ar' ? 'rtl' : 'ltr';

    window.history.pushState({}, '', nextPath);
    setRouteInfo(getRouteInfo(nextPath));
  }, [routeInfo, getRouteInfo]);

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
