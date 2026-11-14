import { createContext, useContext, useState, useEffect } from 'react';
import { services as defaultServices } from '../data/services';
import { industries as defaultIndustries } from '../data/industries';

const SiteDataContext = createContext(null);

const LS_SERVICES   = 'opsynera_admin_services';
const LS_INDUSTRIES = 'opsynera_admin_industries';

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function SiteDataProvider({ children }) {
  const [services,   setServicesRaw]   = useState(() => load(LS_SERVICES,   defaultServices));
  const [industries, setIndustriesRaw] = useState(() => load(LS_INDUSTRIES, defaultIndustries));

  // Persist every change to localStorage so the site always reads the latest data
  const setServices = (val) => {
    const next = typeof val === 'function' ? val(services) : val;
    localStorage.setItem(LS_SERVICES, JSON.stringify(next));
    setServicesRaw(next);
  };

  const setIndustries = (val) => {
    const next = typeof val === 'function' ? val(industries) : val;
    localStorage.setItem(LS_INDUSTRIES, JSON.stringify(next));
    setIndustriesRaw(next);
  };

  // Helper: reset to original data-file defaults
  const resetServices   = () => { localStorage.removeItem(LS_SERVICES);   setServicesRaw(defaultServices); };
  const resetIndustries = () => { localStorage.removeItem(LS_INDUSTRIES); setIndustriesRaw(defaultIndustries); };

  return (
    <SiteDataContext.Provider value={{
      services,   setServices,   resetServices,
      industries, setIndustries, resetIndustries,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used inside <SiteDataProvider>');
  return ctx;
}
