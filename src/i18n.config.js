import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./lang/en/lang";

const resources = {
  en: {
    translation: enLang,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
