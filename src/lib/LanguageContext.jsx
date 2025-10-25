import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Try to detect browser language on first load
  const getDefaultLang = () => {
    if (typeof window !== 'undefined') {
      const lang = navigator.language || navigator.userLanguage;
      if (lang && lang.toLowerCase().startsWith('en')) return 'en';
    }
    return 'id';
  };
  const [lang, setLang] = useState(getDefaultLang());

  // Persist language in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang');
      if (stored && (stored === 'id' || stored === 'en')) setLang(stored);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
