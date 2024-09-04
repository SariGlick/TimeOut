import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Set the default language
    fallbackLng: 'en',
    debug: false, // Disable debug mode for testing
    resources: {
      en: {
        translation: {
          // Add some dummy translations for your tests
          'Tab 1': 'Tab 1',
          'Tab 2': 'Tab 2',
        },
      },
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
