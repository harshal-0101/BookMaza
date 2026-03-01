'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── Royalties ──────────────────────────────────────────────
  const [totalRoyalties] = useState(12000);

  // ── Author Profile (shared across all pages) ───────────────
  const [authorProfile, setAuthorProfile] = useState({
    name:   'Arjun Mehta',
    email:  'arjun.mehta@bookmaza.com',
    avatar: null, // null = show initials, string URL = show photo
  });

  const updateAuthorProfile = (updates) => {
    setAuthorProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider value={{ totalRoyalties, authorProfile, updateAuthorProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}

// ✅ Keep old useRoyalties hook working — no need to update other pages
export const useRoyalties = useAppContext;