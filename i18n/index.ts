import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const i18n = i18next.createInstance();

export const supportedLanguages = ['ca', 'en', 'es'];

const resources = {
  en: {
    translation: require('./locales/en.json'),
  },
  es: {
    translation: require('./locales/es.json'),
  },
  ca: {
    translation: require('./locales/ca.json'),
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    preload: ['es'],
    supportedLngs: supportedLanguages,
    resources: resources,
    fallbackLng: 'es',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    },
  });

for (const lang of supportedLanguages) {
  if (typeof resources[lang] !== 'undefined') {
    i18n.addResourceBundle(lang, 'translation', resources[lang]);
  }
}

export default i18n;
