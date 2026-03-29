import { createContext, useContext, useState, useEffect } from 'react';

const CookieContext = createContext();

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider = ({ children }) => {
  const [consent, setConsent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie_consent');
    if (storedConsent) {
      setConsent(JSON.parse(storedConsent));
    } else {
      setIsOpen(true);
    }
  }, []);

  const acceptAll = () => {
    const preferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    savePreferences(preferences);
  };

  const rejectAll = () => {
    const preferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    savePreferences(preferences);
  };

  const savePreferences = (preferences) => {
    setConsent(preferences);
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    setIsOpen(false);
  };

  const resetConsent = () => {
    setConsent(null);
    localStorage.removeItem('cookie_consent');
    setIsOpen(true);
  };

  return (
    <CookieContext.Provider
      value={{
        consent,
        isOpen,
        setIsOpen,
        settingsOpen,
        setSettingsOpen,
        acceptAll,
        rejectAll,
        savePreferences,
        resetConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
