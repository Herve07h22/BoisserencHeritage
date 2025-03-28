import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./translations";

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // Default language
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
