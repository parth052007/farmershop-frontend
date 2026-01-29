import { createContext, useContext, useState, useEffect } from "react";

const FarmerLangContext = createContext();

export function FarmerLangProvider({ children }) {

  /* 🌍 STEP 1: Browser language detect */
  const detectLang = () => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) return savedLang;

    const browserLang = navigator.language || navigator.userLanguage;

    if (browserLang.startsWith("hi")) return "hi";
    if (browserLang.startsWith("mr")) return "mr";
    return "en";
  };

  /* 🌍 STEP 2: Set language */
  const [lang, setLang] = useState(detectLang());

  /* 💾 STEP 3: Save language */
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <FarmerLangContext.Provider value={{ lang, setLang }}>
      {children}
    </FarmerLangContext.Provider>
  );
}

export const useFarmerLang = () => useContext(FarmerLangContext);
