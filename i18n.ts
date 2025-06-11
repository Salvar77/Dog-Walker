// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import common_en from "./public/locales/en/common.json";
import nav_en from "./public/locales/en/nav.json";
import common_pl from "./public/locales/pl/common.json";
import nav_pl from "./public/locales/pl/nav.json";
import common_es from "./public/locales/es/common.json";
import nav_es from "./public/locales/es/nav.json";

const resources = {
  en: {
    common: common_en,
    nav: nav_en,
    // …
  },
  pl: {
    common: common_pl,
    nav: nav_pl,
    // …
  },
  es: { common: common_es, nav: nav_es },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "pl", "es"],
    ns: ["common", "nav"],
    defaultNS: "common",
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
