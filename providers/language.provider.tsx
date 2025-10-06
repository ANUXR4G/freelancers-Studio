import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext } from 'react';

interface LanguageContextType {
  getInternalPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  getInternalPath: (path) => path,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const getInternalPath = (path: string): string => {
    // Simply return the path as-is since we're using root paths
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <LanguageContext.Provider value={{ getInternalPath }}>{children}</LanguageContext.Provider>
  );
};
