import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import indexEn from "./en/index.json";
import indexVi from "./vi/index.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: indexEn },
            vi: { translation: indexVi },
        },
        fallbackLng: "vi",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
